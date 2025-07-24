import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import InvestorDashboard from "./pages/InvestorDashboard";
import EntrepreneurDashboard from "./pages/EntrepreneurDashboard";
import MyProfile from "./pages/Profile/MyProfile"
import UserProfile from "./pages/Profile/UserProfile"
import InvestorList from "./pages/Profile/InvestorList"
import EntrepreneurList from "./pages/Profile/entrepreneurList"
import LandingPage from "./pages/LandingPage";
import Chat from './pages/Chat';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/dashboard/investor"
          element={<InvestorDashboard />}
        ></Route>
        <Route
          path="/dashboard/entrepreneur"
          element={<EntrepreneurDashboard />}
        ></Route>

        <Route path="/profile/investor/:id" element={<Login />}></Route>
        <Route path="/profile/entrepreneur/:id" element={<Login />}></Route>

        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/entrepreneurs" element={<EntrepreneurList />} />
        <Route path="/investors" element={<InvestorList />} />
        <Route path="/chat/:userId" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;
