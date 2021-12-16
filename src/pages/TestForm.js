import { useContext } from "react/cjs/react.development";
import TestContext from "../contexts/TestContext";

export default function TestForm() {
  const { tests } = useContext(TestContext);

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

  return (
    <form>
      <select>
        <option>-selecione-</option>
        {testsByProfessor.map(({ professor, testsCount }) => (
          <option>
            {professor} ({testsCount})
          </option>
        ))}
      </select>
    </form>
  );
}
