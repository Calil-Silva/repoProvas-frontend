import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TestContext from "./contexts/TestContext";
import { useState } from "react";
import { GlobalStyles } from "./styles/GLobalStyles";

function App() {
  const [tests, setTests] = useState([]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <TestContext.Provider value={{ tests, setTests }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </TestContext.Provider>
    </BrowserRouter>
  );
}

export default App;
