import { Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './auth/login';
import RegisterPage from './auth/register';
function App() {

  return (
    <>

      {/* Route Definitions */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  )
}

export default App
