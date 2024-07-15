import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";
import Navbar from "./components/Navbar";
import SsrfTest from "./components/SsrfTest"; // Import SSRF Test component
import InputValidationTest from "./components/InputValidationTest"; // Import Input Validation Test component
import MemoryManagementVulnerable from "./components/MemoryManagementVulnerable"; // Import Memory Management Vulnerable component

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Create />} />
          <Route path="/read" element={<Read />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/ssrf-test" element={<SsrfTest />} />
          <Route
            path="/input-validation-test"
            element={<InputValidationTest />}
          />
          <Route
            path="/memory-management"
            element={<MemoryManagementVulnerable />}
          />
          {/* Add other routes as necessary */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
