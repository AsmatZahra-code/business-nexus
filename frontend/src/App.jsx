import React from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import InvestorDashboard from './pages/InvestorDashboard';
import EntrepreneurDashboard from './pages/EntrepreneurDashboard';
const App = () => {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/dashboard/investor' element={<InvestorDashboard/>}></Route>
      <Route path='/dashboard/entrepreneur' element={<EntrepreneurDashboard/>}></Route>
   
      <Route path='/profile/investor/:id' element={<Login/>}></Route>
      <Route path='/profile/entrepreneur/:id' element={<Login/>}></Route>



    </Routes>
   </Router>
  )
}

export default App