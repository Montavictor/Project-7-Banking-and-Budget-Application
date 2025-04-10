import logo from "./logo.svg";
import "./App.css";
import CreateUser from "./components/CreateUser/CreateUser";
import Transfer from "./components/Transactions/transfer";
import { sampleData } from "./components/assets/SampleData";

// sample data if users is empty
if (!localStorage.getItem("bankUsers")) {
  sampleData();
} 

function App() {
  return (
    <div className="App">
      <CreateUser />
      <Transfer />
    </div>
  );
}

export default App;
