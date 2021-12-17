import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TestContext from "./contexts/TestContext";
import { useState } from "react";
import { GlobalStyles } from "./styles/GLobalStyles";
import TestFormOptions from "./pages/TestFormOptions";
import Professor from "./pages/Professor";
import Subject from "./pages/Subject";

function App() {
  const [tests, setTests] = useState([]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <TestContext.Provider value={{ tests, setTests }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test-form" element={<TestFormOptions />} />
          <Route path="/test-form/professor" element={<Professor />} />
          <Route path="/test-form/subject" element={<Subject />} />
        </Routes>
      </TestContext.Provider>
    </BrowserRouter>
  );
}

export default App;
