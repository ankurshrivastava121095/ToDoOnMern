/* eslint-disable no-unused-vars */
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './Frontend/SignUp';
import Login from './Frontend/Login';
import Dashboard from './AuthPages/Dashboard';

function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />

          <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
