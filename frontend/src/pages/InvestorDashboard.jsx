
import React, { useEffect, useState } from "react";
import { getEntrepreneurs } from "../api/user";
import EntrepreneurCard from "../components/EntrepreneurCard";
import axios from "../api/axiosConfig";
import DashboardLayout from "../layouts/DashboardLayout";

const InvestorDashboard = () => {
  const [entrepreneurs, setEntrepreneurs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEntrepreneurs();
      setEntrepreneurs(data);
    };
    fetchData();
  }, []);

  const handleRequest = async (entrepreneurId) => {
    try {
      const investorId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!investorId || !token) {
        alert("Missing login info. Please log in again.");
        return;
      }

      const payload = { investorId, entrepreneurId };
      const res = await axios.post("/requests", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Request sent!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to send request");
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Entrepreneurs</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {entrepreneurs.map((e) => (
          <EntrepreneurCard key={e._id} entrepreneur={e} onRequest={handleRequest} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default InvestorDashboard;

