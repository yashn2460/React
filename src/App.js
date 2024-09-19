import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/homepage";
import Register from "./pages/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register/:role" element={<Register />} />
          <Route path="/login/:role" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
