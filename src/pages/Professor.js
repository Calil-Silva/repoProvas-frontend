import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import TestContext from "../contexts/TestContext";
import { getTestsArray } from "../services/testPersistence";

export default function Professor() {
  const { tests, setTests } = useContext(TestContext);

  useEffect(() => {
    setTests(getTestsArray());
  }, [setTests]);

  const [testOrder, setTestOrder] = useState({
    professor: "",
    category: "",
    name: "",
    subject: "",
  });

  const testsList = tests.tests;

  const professorsList = tests.professors?.reduce((arr, professor) => {
    arr.push(professor.professor_name);
    return arr;
  }, []);

  let testsByProfessor = [];

  for (let i = 0; i < professorsList?.length; i++) {
    let count = 0;
    for (let j = 0; j < testsList?.length; j++) {
      if (professorsList[i] === testsList[j].professorName) {
        count++;
      }
    }
    const handleTestsByProfessorObj = {
      professor: professorsList[i],
      testsCount: count,
    };
    testsByProfessor.push(handleTestsByProfessorObj);
  }

  let categoriesByProfessor = tests.tests
    ?.filter(({ professorName }) => professorName === testOrder.professor)
    .map(({ categoryName }) => categoryName);

  categoriesByProfessor = [...new Set(categoriesByProfessor)];

  let namesByTests = tests.tests
    ?.filter(
      ({ professorName, categoryName }) =>
        professorName === testOrder.professor &&
        categoryName === testOrder.category
    )
    .map(({ testName }) => testName);

  namesByTests = [...new Set(namesByTests)];

  let subjectByProfessor = tests.tests
    ?.filter(
      ({ professorName, categoryName, testName }) =>
        professorName === testOrder.professor &&
        categoryName === testOrder.category &&
        testName === testOrder.name
    )
    .map(({ subjectName }) => subjectName);

  subjectByProfessor = [...new Set(subjectByProfessor)];

  const orderedTestLink = tests.tests?.filter((test) => {
    const item =
      test.testName === testOrder.name &&
      test.categoryName === testOrder.category &&
      test.subjectName === testOrder.subject &&
      test.professorName === testOrder.professor;

    if (item) return true;

    return false;
  });

  return (
    <Form>
      <StepsTitle>Selecione o professor</StepsTitle>
      <Select
        onChange={(e) =>
          setTestOrder({
            professor: testsByProfessor[e.target.selectedIndex - 1]?.professor,
            category: "",
            name: "",
            subject: "",
          })
        }
      >
        <option>-selecione-</option>
        {testsByProfessor?.map(({ professor, testsCount }) => (
          <option key={professor}>
            {professor} ({testsCount})
          </option>
        ))}
      </Select>

      <StepsTitle disabled={testOrder.professor ? false : true}>
        Agora, selecione a categoria
      </StepsTitle>
      <Select
        onChange={(e) =>
          setTestOrder({
            ...testOrder,
            category: categoriesByProfessor[e.target.selectedIndex - 1],
          })
        }
        disabled={testOrder.professor ? false : true}
      >
        <option>-selecione-</option>
        {categoriesByProfessor?.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </Select>

      <StepsTitle disabled={testOrder.category ? false : true}>
        Agora, selecione o nome
      </StepsTitle>
      <Select
        onChange={(e) =>
          setTestOrder({
            ...testOrder,
            name: namesByTests[e.target.selectedIndex - 1],
          })
        }
        disabled={testOrder.category ? false : true}
      >
        <option>-selecione-</option>
        {namesByTests?.map((name) => (
          <option key={name}>{name}</option>
        ))}
      </Select>

      <StepsTitle disabled={testOrder.name ? false : true}>
        Agora, selecione a matéria
      </StepsTitle>
      <Select
        onChange={(e) =>
          setTestOrder({
            ...testOrder,
            subject: subjectByProfessor[e.target.selectedIndex - 1],
          })
        }
        disabled={testOrder.name ? false : true}
      >
        <option>-selecione-</option>
        {subjectByProfessor?.map((subject) => (
          <option key={subject}>{subject}</option>
        ))}
      </Select>

      {orderedTestLink &&
        orderedTestLink.map((order, index) => (
          <Link key={index} href={order.link}>
            Acessar repo {index + 1}
          </Link>
        ))}
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Link = styled.a`
  font-weight: bold;
  font-size: 1.5rem;
  color: red;
  margin-bottom: 1rem;

  :hover {
    color: lightgoldenrodyellow;
  }
`;

const StepsTitle = styled.h2`
  font-weight: bold;
  color: greenyellow;
  opacity: ${({ disabled }) => (disabled ? 0 : 1)};
  transition: 1s all;
  cursor: default;
  user-select: none;
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
