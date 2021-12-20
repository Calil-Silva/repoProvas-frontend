import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import TestContext from "../contexts/TestContext";
import { getTestsArray } from "../services/testPersistence";

export default function Subject() {
  const { tests, setTests } = useContext(TestContext);

  useEffect(() => {
    setTests(getTestsArray());
  }, [setTests]);

  const [testOrder, setTestOrder] = useState({
    period: "",
    subject: "",
    category: "",
    professor: "",
  });

  const testsList = tests.tests;

  const periodsList = tests.periods?.reduce((arr, period) => {
    arr.push(period.periodName);
    return arr;
  }, []);

  const subjectsList = tests?.subjects;

  for (let i = 0; i < subjectsList?.length; i++) {
    let count = 0;
    for (let j = 0; j < testsList?.length; j++) {
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
    ?.filter(
      ({ periodName, subjectName }) =>
        periodName === testOrder.period && subjectName === testOrder.subject
    )
    .map(({ categoryName }) => categoryName);

  categories = [...new Set(categories)];

  let names = tests.tests
    ?.filter(
      ({ periodName, subjectName, categoryName }) =>
        periodName === testOrder.period &&
        subjectName === testOrder.subject &&
        categoryName === testOrder.category
    )
    .map(({ testName }) => testName);

  names = [...new Set(names)];

  let professors = tests.tests
    ?.filter(
      ({ periodName, subjectName, categoryName, testName }) =>
        periodName === testOrder.period &&
        subjectName === testOrder.subject &&
        categoryName === testOrder.category &&
        testName === testOrder.name
    )
    .map(({ professorName }) => professorName);

  professors = [...new Set(professors)];

  const orderedTestLink = tests.tests?.filter((test) => {
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
    <Form>
      <StepsTitle>Primeiro, selecione o período</StepsTitle>
      <Select
        onChange={(e) =>
          setTestOrder({
            period: periodsList[e.target.selectedIndex - 1],
            subject: "",
            category: "",
          })
        }
      >
        <option>-selecione-</option>
        {periodsList?.map((period) => (
          <option key={period}>{period}</option>
        ))}
      </Select>

      <StepsTitle disabled={testOrder.period ? false : true}>
        Agora, selecione a matéria
      </StepsTitle>
      <Select
        onChange={(e) =>
          setTestOrder({
            ...testOrder,
            subject: subjectsList[e.target.selectedIndex - 1]?.subject_name,
          })
        }
        disabled={testOrder.period ? false : true}
      >
        <option>-selecione-</option>
        {subjectsList?.map(({ subject_name, count }) => (
          <option key={subject_name}>
            {subject_name} ({count || 0})
          </option>
        ))}
      </Select>

      <StepsTitle disabled={testOrder.subject ? false : true}>
        Agora, selecione a categoria
      </StepsTitle>
      <Select
        onChange={(e) =>
          setTestOrder({
            ...testOrder,
            category: categories[e.target.selectedIndex - 1],
          })
        }
        disabled={testOrder.subject ? false : true}
      >
        <option>-selecione-</option>
        {categories?.map((category) => (
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
            name: names[e.target.selectedIndex - 1],
          })
        }
        disabled={testOrder.category ? false : true}
      >
        <option>-selecione-</option>
        {names?.map((name) => (
          <option key={name}>{name}</option>
        ))}
      </Select>

      <StepsTitle disabled={testOrder.name ? false : true}>
        Por fim, selecione o professor
      </StepsTitle>
      <Select
        onChange={(e) =>
          setTestOrder({
            ...testOrder,
            professor: professors[e.target.selectedIndex - 1],
          })
        }
        disabled={testOrder.name ? false : true}
      >
        <option>-selecione-</option>
        {professors?.map((professors) => (
          <option key={professors}>{professors}</option>
        ))}
      </Select>

      {orderedTestLink &&
        orderedTestLink?.map((order, index) => (
          <Link key={index} href={order.link}>
            Acessar
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
