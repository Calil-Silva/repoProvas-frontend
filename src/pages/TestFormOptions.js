import { Link } from "react-router-dom";
import { Button } from "../styles/sharedStyles";

export default function TestFormOptions() {
  return (
    <div>
      <Link to="/test-form/professor">
        <Button>Listar provas por professor</Button>
      </Link>
      <Link to="/test-form/subject">
        <Button>Listar provas por disciplina</Button>
      </Link>
    </div>
  );
}
