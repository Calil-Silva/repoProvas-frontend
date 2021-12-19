import { useContext, useEffect, useState } from "react";
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
    <form>
      <input
        type="text"
        placeholder="Nome da prova"
        onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
      />
      <select
        onChange={(e) =>
          setNewTest({
            ...newTest,
            period: periodsNames[e.target.selectedIndex - 1],
          })
        }
      >
        <option>-selecione-</option>
        {periodsNames?.map((period) => (
          <option key={period}>{period}</option>
        ))}
      </select>

      <select
        onChange={(e) =>
          setNewTest({
            ...newTest,
            category: categoriesNames[e.target.selectedIndex - 1],
          })
        }
      >
        <option>-selecione-</option>
        {categoriesNames?.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>

      <select
        onChange={(e) =>
          setNewTest({
            ...newTest,
            subject: subjects[e.target.selectedIndex - 1],
            professor: "",
          })
        }
      >
        <option>-selecione-</option>
        {subjects?.map((subject) => (
          <option key={subject}>{subject}</option>
        ))}
      </select>

      <select
        onChange={(e) =>
          setNewTest({
            ...newTest,
            professor: professors[e.target.selectedIndex - 1],
          })
        }
      >
        <option>-selecione-</option>
        {professors?.map((professor) => (
          <option key={professor}>{professor}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Link"
        onChange={(e) => setNewTest({ ...newTest, link: e.target.value })}
      />

      <input type="submit" value="Enviar" onClick={testSubmit} />
    </form>
  );
}
