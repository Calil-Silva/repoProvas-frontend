import { useContext, useState } from "react";
import TestContext from "../contexts/TestContext";

export default function Subject() {
  const { tests } = useContext(TestContext);

  const [testOrder, setTestOrder] = useState({
    period: "",
    subject: "",
    category: "",
    professor: "",
  });

  const testsList = tests.tests;

  const periodsList = tests.periods.reduce((arr, period) => {
    arr.push(period.period_name);
    return arr;
  }, []);

  const subjectsList = tests.subjects;

  for (let i = 0; i < subjectsList.length; i++) {
    let count = 0;
    for (let j = 0; j < testsList.length; j++) {
      if (
        testOrder.period === testsList[j].periodName &&
        subjectsList[i].subject_name === testsList[j].subjectName
      ) {
        count++;
      }
    }
    subjectsList[i].count = count;
  }

  let categories = tests.tests
    .filter(
      ({ periodName, subjectName }) =>
        periodName === testOrder.period && subjectName === testOrder.subject
    )
    .map(({ categoryName }) => categoryName);

  categories = [...new Set(categories)];

  let names = tests.tests
    .filter(
      ({ periodName, subjectName, categoryName }) =>
        periodName === testOrder.period &&
        subjectName === testOrder.subject &&
        categoryName === testOrder.category
    )
    .map(({ testName }) => testName);

  names = [...new Set(names)];

  let professors = tests.tests
    .filter(
      ({ periodName, subjectName, categoryName, testName }) =>
        periodName === testOrder.period &&
        subjectName === testOrder.subject &&
        categoryName === testOrder.category &&
        testName === testOrder.name
    )
    .map(({ professorName }) => professorName);

  professors = [...new Set(professors)];

  const orderedTestLink = tests.tests.filter((test) => {
    const item =
      test.testName === testOrder.name &&
      test.categoryName === testOrder.category &&
      test.subjectName === testOrder.subject &&
      test.professorName === testOrder.professor &&
      test.periodName === testOrder.period;

    if (item) return true;

    return false;
  });

  return (
    <form>
      <select
        onChange={(e) =>
          setTestOrder({
            period: periodsList[e.target.selectedIndex - 1],
            subject: "",
            category: "",
          })
        }
      >
        <option>-selecione-</option>
        {periodsList.map((period) => (
          <option key={period}>{period}</option>
        ))}
      </select>

      <select
        onChange={(e) =>
          setTestOrder({
            ...testOrder,
            subject: subjectsList[e.target.selectedIndex - 1].subject_name,
          })
        }
      >
        <option>-selecione-</option>
        {subjectsList.map(({ subject_name, count }) => (
          <option key={subject_name}>
            {subject_name} ({count || 0})
          </option>
        ))}
      </select>

      <select
        onChange={(e) =>
          setTestOrder({
            ...testOrder,
            category: categories[e.target.selectedIndex - 1],
          })
        }
      >
        <option>-selecione-</option>
        {categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>

      <select
        onChange={(e) =>
          setTestOrder({
            ...testOrder,
            name: names[e.target.selectedIndex - 1],
          })
        }
      >
        <option>-selecione-</option>
        {names.map((name) => (
          <option key={name}>{name}</option>
        ))}
      </select>

      <select
        onChange={(e) =>
          setTestOrder({
            ...testOrder,
            professor: professors[e.target.selectedIndex - 1],
          })
        }
      >
        <option>-selecione-</option>
        {professors.map((professors) => (
          <option key={professors}>{professors}</option>
        ))}
      </select>

      {orderedTestLink &&
        orderedTestLink.map(({ link }) => <a href={link}>Acessar</a>)}
    </form>
  );
}
