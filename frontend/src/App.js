// App.js

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './components/Create';
import Read from './components/Read';
import Update from './components/Update';
import Navbar from './components/Navbar';
import SsrfTest from './components/SsrfTest';
import InputValidationTest from './components/InputValidationTest';
import MemoryManagementVulnerable from './components/MemoryManagementVulnerable';
import ReflectedXSS from './components/ReflectedXSS'; // Make sure this import is correct
import StoredXSS from './components/StoredXSS';
import BlindXSS from './components/BlindXSS';
import XSS from './components/XSS';
import LoginForm from './components/LoginForm'; // Import the LoginForm component

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
          <Route path="/input-validation-test" element={<InputValidationTest />} />
          <Route path="/memory-management" element={<MemoryManagementVulnerable />} />
          <Route path="/xss-test" element={<ReflectedXSS />} /> {/* This should use ReflectedXSS */}
          <Route path="/storedxss" element={<StoredXSS />} /> {/* Add route for StoredXSS */}
          <Route path="/blindxss" element={<BlindXSS />} /> 
          <Route path="/xss" element={<XSS />} /> {/* Define your route for XSS.jsx */}
          <Route path="/reactxss" element={<reactxss />} />
          <Route path="/login" element={<LoginForm />} /> {/* Route for LoginForm */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
