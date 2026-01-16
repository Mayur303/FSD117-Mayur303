import Login from "./pages/Login";
import Vendor from "./pages/Vendor";
import Verifier from "./pages/Verifier";

function App() {
  return (
    <div>
      <Login />
      <hr />
      <Vendor />
      <hr />
      <Verifier />
    </div>
  );
}

const role = localStorage.getItem("role");

{role === "vendor" && <Vendor />}
{role === "verifier" && <Verifier />}
// {role === "admin" && <Admin />}


export default App;


