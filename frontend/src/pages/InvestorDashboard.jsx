// import React from 'react';
// import DashboardLayout from '../layouts/DashboardLayout';
// import Button from "../components/Button";
// import InputField from "../components/InputField";
// import Card from "../components/Card";
// import Avatar from "../components/Avatar";
// const InvestorDashboard = () => {
//   return (
//     <DashboardLayout>
//       <h2 className="text-2xl font-bold mb-4">Investor Dashboard</h2>
//       {/* Your investor dashboard content */}
//        <Card>
//       <Avatar src="/path-to-avatar.jpg" />
//       <InputField label="Email" type="email" />
//       <Button onClick={() => alert("Clicked!")}>Submit</Button>
//     </Card>
//     </DashboardLayout>
//   );
// };


// export default InvestorDashboard;
import React, { useEffect, useState } from 'react';
import { getEntrepreneurs } from '../api/user';
import EntrepreneurCard from '../components/EntrepreneurCard';
import axios from '../api/axiosConfig';
const InvestorDashboard = () => {
  const [entrepreneurs, setEntrepreneurs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEntrepreneurs();
      setEntrepreneurs(data);
    };

    fetchData();
  }, []);

  // const handleRequest = async (entrepreneurId) => {
  //   try {
  //     console.log('userId');
  //     const investorId = localStorage.getItem('userId'); // Store this at login!
  //     const res = await axios.post('/request', { investorId, entrepreneurId });
  //     alert("Request sent!");
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Failed to send request");
  //   }
  // };
  const handleRequest = async (entrepreneurId) => {
  try {
    const investorId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!investorId || !token) {
      alert("Missing login info. Please log in again.");
      return;
    }

    const payload = { investorId, entrepreneurId };
    console.log('Sending request payload:', payload);

    const res = await axios.post('/request', payload, {
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Entrepreneurs</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {entrepreneurs.map((e) => (
          <EntrepreneurCard key={e._id} entrepreneur={e} onRequest={handleRequest} />
        ))}
      </div>
    </div>
  );
};

export default InvestorDashboard;
