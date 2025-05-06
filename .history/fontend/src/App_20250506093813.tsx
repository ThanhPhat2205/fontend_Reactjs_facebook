import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Auth/LoginForm';
import RegisterPage from './components/Auth/RegisterForm';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar'; 

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
