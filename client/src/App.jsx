import { useState } from 'react'

import './App.css'
import LandingPage from './components/Landing/LandingPage'
import { Routes , Route} from 'react-router'
import Login from './pages/auth/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  

  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App
