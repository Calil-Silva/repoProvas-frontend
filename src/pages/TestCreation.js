import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import TestContext from "../contexts/TestContext";
import { postTestsParams } from "../services/repoProvas";
import { getTestCreationParams } from "../services/testCreationPersistence";

export default function TestCreation() {
  const { testsParams, setTestsParams } = useContext(TestContext);
  const { categoriesNames, periodsNames, professorsBySubject } = testsParams;

  useEffect(() => {
    setTestsParams(getTestCreationParams());
  }, [setTestsParams]);

  const [newTest, setNewTest] = useState({
    name: "",
    category: "",
    subject: "",
    professor: "",
    link: "",
    period: "",
  });

  const subjects = professorsBySubject?.reduce((arr, cur) => {
    arr.push(cur.subject);

    return [...new Set(arr)];
  }, []);

  const professors = professorsBySubject
    ?.filter(({ subject }) => subject === newTest.subject)
    .map(({ professor }) => professor);

  function testSubmit(e) {
    e.preventDefault();

    postTestsParams(newTest)
      .then(() => alert("Prova criada com sucesso"))
      .catch(() => alert("Ocorreu um erro, tente novamente"));
  }

  return (
    <Container>
      <Form>
        <StepsTitle>Por favor, digite o nome da prova aplicada</StepsTitle>
        <Input
          type="text"
          placeholder="Nome da prova"
          onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
        />

        <StepsTitle disabled={!newTest.name ? true : false}>
          Agora escolha o período
        </StepsTitle>
        <Select
          onChange={(e) =>
            setNewTest({
              ...newTest,
              period: periodsNames[e.target.selectedIndex - 1],
            })
          }
          disabled={!newTest.name ? true : false}
        >
          <option>-selecione-</option>
          {periodsNames?.map((period) => (
            <option key={period}>{period}</option>
          ))}
        </Select>

        <StepsTitle disabled={!newTest.period ? true : false}>
          Agora a categoria
        </StepsTitle>
        <Select
          onChange={(e) =>
            setNewTest({
              ...newTest,
              category: categoriesNames[e.target.selectedIndex - 1],
            })
          }
          disabled={!newTest.period ? true : false}
        >
          <option>-selecione-</option>
          {categoriesNames?.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </Select>

        <StepsTitle disabled={!newTest.category ? true : false}>
          Agora escolha a matéria
        </StepsTitle>
        <Select
          onChange={(e) =>
            setNewTest({
              ...newTest,
              subject: subjects[e.target.selectedIndex - 1],
              professor: "",
            })
          }
          disabled={!newTest.category ? true : false}
        >
          <option>-selecione-</option>
          {subjects?.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </Select>

        <StepsTitle disabled={!newTest.subject ? true : false}>
          Agora escolha o professor
        </StepsTitle>
        <Select
          onChange={(e) =>
            setNewTest({
              ...newTest,
              professor: professors[e.target.selectedIndex - 1],
            })
          }
          disabled={!newTest.subject ? true : false}
        >
          <option>-selecione-</option>
          {professors?.map((professor) => (
            <option key={professor}>{professor}</option>
          ))}
        </Select>

        <StepsTitle disabled={!newTest.professor ? true : false}>
          Por fim, insira o link do repositório
        </StepsTitle>
        <Input
          type="text"
          placeholder="Link"
          onChange={(e) => setNewTest({ ...newTest, link: e.target.value })}
          disabled={!newTest.professor ? true : false}
        />

        <Input
          type="submit"
          value="Enviar"
          onClick={testSubmit}
          disabled={!newTest.link ? true : false}
        />
      </Form>
    </Container>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StepsTitle = styled.h2`
  font-weight: bold;
  color: greenyellow;
  opacity: ${({ disabled }) => (disabled ? 0 : 1)};
  transition: 1s all;
  cursor: default;
  user-select: none;
`;

const Input = styled.input`
  appearance: none;
  width: calc(100% - 1rem);
  max-width: 20rem;
  height: 2.5rem;
  border-radius: 0.25em;
  border: 1px solid var(--select-border);
  font-size: 1rem;
  padding-left: 0.5rem;
  margin: 0.5rem 0 1.5rem;
  background-color: ${({ disabled }) =>
    disabled ? "rgb(240, 240, 240)" : "#fff"};
  opacity: ${({ disabled }) => (disabled ? 0 : 1)};
  transition: 1s all;
  cursor: ${({ disabled }) => (disabled ? "inherit" : "text")};

  ::placeholder {
    color: ${({ disabled }) => (disabled ? "rgb(190, 190, 190)" : "#000")};
  }

  &:last-child {
    cursor: ${({ disabled }) => (disabled ? "inherit" : "pointer")};
    font-weight: bold;
    :hover {
      opacity: ${({ disabled }) => (disabled ? 0 : 0.95)};
    }
    background-color: rgb(150, 150, 150);
    opacity: ${({ disabled }) => (disabled ? 0 : 1)};
  }
`;

const Select = styled.select`
  outline: none;
  margin: 0.5rem 0 1.5rem;
  width: calc(100% - 1rem);
  max-width: 20rem;
  height: 2.5rem;
  border: 1px solid var(--select-border);
  border-radius: 0.25em;
  font-size: 1rem;
  cursor: ${({ disabled }) => (disabled ? "inherit" : "pointer")};
  line-height: 1.1;
  background-color: #fff;
  opacity: ${({ disabled }) => (disabled ? 0 : 1)};
  transition: 1s all;

  :focus {
    border: 2px solid var(--select-focus);
    border-radius: inherit;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
