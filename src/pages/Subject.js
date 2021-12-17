import { useContext, useState } from "react";
import TestContext from "../contexts/TestContext";

export default function Subject() {
  const { tests } = useContext(TestContext);

  const [testOrder, setTestOrder] = useState({
    period: "",
    subject: "",
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

  return (
    <form>
      <select
        onChange={(e) =>
          setTestOrder({
            period: periodsList[e.target.selectedIndex - 1],
            subject: "",
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
    </form>
  );
}
