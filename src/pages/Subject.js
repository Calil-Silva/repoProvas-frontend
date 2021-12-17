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

  let subjectsByPeriods = tests.tests.reduce((arr, test) => {
    arr.push({ subject: test.subjectName, period: test.periodName });
    return arr;
  }, []);

  for (let i = 0; i < subjectsByPeriods.length - 1; i++) {
    let count = 1;
    for (let j = i + 1; j < subjectsByPeriods.length; j++) {
      if (
        subjectsByPeriods[i].subject === subjectsByPeriods[j].subject &&
        subjectsByPeriods[i].period === subjectsByPeriods[j].period
      ) {
        subjectsByPeriods.splice(j, 1);
        count++;
        j--;
      }
    }

    subjectsByPeriods[i].count = count;
  }

  subjectsByPeriods = subjectsByPeriods.filter(
    ({ period }) => period === testOrder.period
  );

  // for (let i = 0; i < periodsList.length; i++) {
  //   let count = 0;
  //     for (let j = 0; j < subjectsByPeriods.length; j++) {
  //       if (periodsList[i] === subjectsByPeriods[j].period) {
  //         count++;
  //       }
  //     }
  //     const handleTestsBySubject = {
  //       subject: subjectsByPeriods[j].subjectName,
  //     };
  // }

  console.log(testOrder);

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
            subject: subjectsByPeriods[e.target.selectedIndex - 1].subject,
          })
        }
      >
        <option>-selecione-</option>
        {subjectsByPeriods.map(({ subject, count }) => (
          <option key={subject}>
            {subject} ({count || 1})
          </option>
        ))}
      </select>
    </form>
  );
}
