import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Login from './components/LoginForm.jsx';
import Register from './components/RegisterForm.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/" element={<Login onLogin={() => console.log("Login success")}  />} />
        <Route path="/register" element={<Register onRegistered={() => console.log("Registration success")} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
