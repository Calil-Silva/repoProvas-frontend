import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TestContext from "../contexts/TestContext";
import { getTests, getTestsParams } from "../services/repoProvas";
import { storeTestCreationParams } from "../services/testCreationPersistence";
import { Button } from "../styles/sharedStyles";

export default function Home() {
  const navigate = useNavigate();
  const { setTests, setTestsParams } = useContext(TestContext);

  const handleTests = () => {
    getTests().then((res) => {
      setTests(res.data);
      navigate("/test-form");
    });
  };

  const handleTestsParams = () => {
    getTestsParams()
      .then((res) => {
        setTestsParams(res.data);
        storeTestCreationParams(res.data);
        navigate("/test-creation");
      })
      .catch(() => {
        alert("Ocorreu um erro inesperado, tente novamente mais tarde");
        navigate("/");
      });
  };

  return (
    <div>
      <>
        <Button onClick={handleTests}>Visualizar prova</Button>
        <Button onClick={handleTestsParams}>Compartilhar prova</Button>
      </>
    </div>
  );
}
