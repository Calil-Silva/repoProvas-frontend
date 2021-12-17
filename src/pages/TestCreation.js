import { useContext, useState } from "react";
import TestContext from "../contexts/TestContext";

export default function TestCreation() {
  const { tests } = useContext(TestContext);
  const [newTest, setNewTest] = useState({
    name: "",
    category: "",
    subject: "",
    professor: "",
    link: "",
    period: "",
  });

  console.log(newTest);

  return (
    <form>
      <input
        type="text"
        placeholder="Nome da prova"
        onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Período"
        onChange={(e) => setNewTest({ ...newTest, period: e.target.value })}
      />
      <input
        type="text"
        placeholder="Categoria"
        onChange={(e) => setNewTest({ ...newTest, category: e.target.value })}
      />
      <input
        type="text"
        placeholder="Disciplina"
        onChange={(e) => setNewTest({ ...newTest, subject: e.target.value })}
      />
      <input
        type="text"
        placeholder="Professor"
        onChange={(e) => setNewTest({ ...newTest, professor: e.target.value })}
      />
      <input
        type="text"
        placeholder="Link"
        onChange={(e) => setNewTest({ ...newTest, link: e.target.value })}
      />
    </form>
  );
}
