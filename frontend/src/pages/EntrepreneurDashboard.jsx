import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/Card";
import InvestorCard from "../components/InvestorCard";
import defAvatar from "../assets/avatar-def.png";

const EntrepreneurDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [token, setToken] = useState("");
  const [entrepreneurId, setEntrepreneurId] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedId = localStorage.getItem("userId");

    setToken(storedToken);
    setEntrepreneurId(storedId);
  }, []);

  // Fetch requests received by this entrepreneur
  useEffect(() => {
    if (!entrepreneurId || !token) return;

    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `/requests/entrepreneur/${entrepreneurId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching collaboration requests:", err);
      }
    };

    fetchRequests();
  }, [entrepreneurId, token]);

  // Fetch all investors (for discover section)
  useEffect(() => {
    if (!token) return;

    const fetchInvestors = async () => {
      try {
        const res = await axios.get("/profile/role/investors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvestors(res.data);
      } catch (err) {
        console.error("Failed to fetch investors:", err);
      }
    };

    fetchInvestors();
  }, [token]);

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      await axios.patch(
        `/requests/${requestId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests((prev) =>
        prev.map((r) => (r._id === requestId ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error("Failed to update request status:", err);
      alert("Could not update request status.");
    }
  };

  const handleRequest = async (investorId) => {
    try {
      await axios.post(
        "/requests",
        { investorId, entrepreneurId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Request sent!");
    } catch (err) {
      console.error("Failed to send request:", err);
      alert(err.response?.data?.message || "Failed to send request.");
    }
  };

  const handleChat = async (receiverId) => {
    try {
      const res = await axios.post(
        "/chat/start",
        { senderId: entrepreneurId, receiverId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.href = `/chat/${res.data._id}`;
    } catch (err) {
      console.error("Failed to start chat:", err);
      alert("Could not start chat");
    }
  };

  return (
    <DashboardLayout>
      {/* Collaboration Requests Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Collaboration Requests</h2>
        {requests.length === 0 ? (
          <p>No collaboration requests yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {requests.map((req) => (
              <Card key={req._id}>
                <img
                  src={
                    req.investorId?.avatar
                      ? `http://localhost:5000${
                          req.investorId.avatar
                        }?t=${new Date().getTime()}`
                      : defAvatar
                  }
                  alt={req.investorId?.name || "Investor Avatar"}
                  className="w-12 h-12 rounded-full object-cover border border-gray-300"
                />

                <h3 className="text-xl font-semibold">
                  {req.investorId?.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {req.investorId?.bio || "No bio provided."}
                </p>
                <p className="mt-2">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      req.status === "Pending"
                        ? "text-yellow-500"
                        : req.status === "Accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>

                {req.status === "Pending" && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(req._id, "Accepted")}
                      className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(req._id, "Rejected")}
                      className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Available Investors Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Investors</h2>
        {investors.length === 0 ? (
          <p>No investors available at the moment.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {investors.map((inv) => (
              <InvestorCard
                key={inv._id}
                investor={inv}
                onRequest={handleRequest}
                onChat={handleChat}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EntrepreneurDashboard;
