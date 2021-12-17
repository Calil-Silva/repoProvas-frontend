import { useState } from "react";
import { useContext } from "react/cjs/react.development";
import TestContext from "../contexts/TestContext";

export default function Professor() {
  const { tests } = useContext(TestContext);

  const [testOrder, setTestOrder] = useState({
    professor: "",
    category: "",
    name: "",
    subject: "",
  });

  const testsList = tests.tests;

  const professorsList = tests.professors.reduce((arr, professor) => {
    arr.push(professor.professor_name);
    return arr;
  }, []);

  let testsByProfessor = [];

  for (let i = 0; i < professorsList.length; i++) {
    let count = 0;
    for (let j = 0; j < testsList.length; j++) {
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
    .filter(({ professorName }) => professorName === testOrder.professor)
    .map(({ categoryName }) => categoryName);

  categoriesByProfessor = [...new Set(categoriesByProfessor)];

  let namesByTests = tests.tests
    .filter(
      ({ professorName, categoryName }) =>
        professorName === testOrder.professor &&
        categoryName === testOrder.category
    )
    .map(({ testName }) => testName);

  namesByTests = [...new Set(namesByTests)];

  let subjectByProfessor = tests.tests
    .filter(
      ({ professorName, categoryName, testName }) =>
        professorName === testOrder.professor &&
        categoryName === testOrder.category &&
        testName === testOrder.name
    )
    .map(({ subjectName }) => subjectName);

  subjectByProfessor = [...new Set(subjectByProfessor)];

  const orderedTestLink = tests.tests.find((test) => {
    const item =
      test.testName === testOrder.name &&
      test.categoryName === testOrder.category &&
      test.subjectName === testOrder.subject &&
      test.professorName === testOrder.professor;

    if (item) return true;

    return false;
  });

  return (
    <form>
      <select
        onChange={(e) =>
          setTestOrder({
            professor: testsByProfessor[e.target.selectedIndex - 1].professor,
            category: "",
            name: "",
            subject: "",
          })
        }
      >
        <option>-selecione-</option>
        {testsByProfessor.map(({ professor, testsCount }) => (
          <option key={professor}>
            {professor} ({testsCount})
          </option>
        ))}
      </select>

      <select
        onChange={(e) =>
          setTestOrder({
            ...testOrder,
            category: categoriesByProfessor[e.target.selectedIndex - 1],
          })
        }
      >
        <option>-selecione-</option>
        {categoriesByProfessor.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>

      <select
        onChange={(e) =>
          setTestOrder({
            ...testOrder,
            name: namesByTests[e.target.selectedIndex - 1],
          })
        }
      >
        <option>-selecione-</option>
        {namesByTests.map((name) => (
          <option key={name}>{name}</option>
        ))}
      </select>

      <select
        onChange={(e) =>
          setTestOrder({
            ...testOrder,
            subject: subjectByProfessor[e.target.selectedIndex - 1],
          })
        }
      >
        <option>-selecione-</option>
        {subjectByProfessor.map((subject) => (
          <option key={subject}>{subject}</option>
        ))}
      </select>

      {orderedTestLink && <a href={orderedTestLink.link}>Acessar</a>}
    </form>
  );
}
