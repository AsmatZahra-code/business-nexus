// src/pages/EntrepreneurDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import Card from '../components/Card';

const EntrepreneurDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const entrepreneurId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get(`/requests/entrepreneur/${entrepreneurId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API response:', res.data);

        setRequests(res.data);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to load requests");
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Collaboration Requests</h2>
      {requests.length === 0 ? (
        <p>No collaboration requests yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {requests.map((req) => (
            <Card key={req._id}>
              <h3 className="text-xl font-semibold">{req.investorId.name}</h3>
              <p className="text-sm text-gray-600">{req.investorId.bio || 'No bio provided.'}</p>
              <p className="mt-2">
                <strong>Status:</strong>{' '}
                <span className={`font-semibold ${
                  req.status === 'Pending' ? 'text-yellow-500' :
                  req.status === 'Accepted' ? 'text-green-600' :
                  'text-red-600'
                }`}>
                  {req.status}
                </span>
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntrepreneurDashboard;
