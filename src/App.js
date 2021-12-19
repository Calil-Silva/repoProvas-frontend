import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TestContext from "./contexts/TestContext";
import { useState } from "react";
import { GlobalStyles } from "./styles/GLobalStyles";
import TestCreation from "./pages/TestCreation";

function App() {
  const [tests, setTests] = useState([]);
  const [testsParams, setTestsParams] = useState({});

  return (
    <BrowserRouter>
      <GlobalStyles />
      <TestContext.Provider
        value={{ tests, setTests, testsParams, setTestsParams }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test-creation" element={<TestCreation />} />
        </Routes>
      </TestContext.Provider>
    </BrowserRouter>
  );
}

export default App;
