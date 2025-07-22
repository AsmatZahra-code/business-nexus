
import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/Card";
import EditProfileModal from "../components/EditProfileModal";
import { useNavigate } from "react-router-dom";
import socket from "../utils/socket"; // ✅ Make sure this is correct
import InvestorCard from "../components/InvestorCard";
const EntrepreneurDashboard = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [unread, setUnread] = useState({}); // ✅ Tracks unread message status

  const navigate = useNavigate();

  // Fetch Entrepreneur profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get("/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    fetchProfile();
  }, []);

  // Fetch collaboration requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const entrepreneurId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `/requests/entrepreneur/${entrepreneurId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to load requests");
      }
    };

    fetchRequests();
  }, []);

  // Fetch list of Investors
  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/profile/role/investors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvestors(res.data);
      } catch (err) {
        console.error("Failed to fetch investors:", err);
      }
    };

    fetchInvestors();
  }, []);

  // 🟢 Socket listener for new messages
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    socket.on("receiveMessage", (msg) => {
      if (msg.receiverId === userId) {
        console.log("📨 New message received:", msg);

        // Show badge for this sender
        setUnread((prev) => ({ ...prev, [msg.senderId]: true }));

        // Optional: Use toast or sound notification here
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleProfileUpdated = (updatedUser) => {
    setUser(updatedUser);
    alert("Profile updated!");
    setEditOpen(false);
  };

  const handleRequest = async (investorId) => {
    try {
      const entrepreneurId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!entrepreneurId || !token) {
        alert("Missing login info. Please log in again.");
        return;
      }

      const payload = { entrepreneurId, investorId };
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

  const handleChat = async (receiverId) => {
    try {
      const senderId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "/chat/start",
        { senderId, receiverId },
        {
          headers: {
            Authorization: `Bearer ${token}` },
        }
      );

      setUnread((prev) => {
        const updated = { ...prev };
        delete updated[receiverId];
        return updated;
      });

      navigate(`/chat/${res.data._id}`);
    } catch (err) {
      console.error("Failed to start chat", err);
      alert("Could not start chat");
    }
  };

  return (
    <DashboardLayout>
      {showProfile && user && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">My Profile</h2>
            <button
              onClick={() => setEditOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Bio:</strong> {user.bio || "N/A"}</p>
            <p><strong>Startup Description:</strong> {user.startupDescription || "N/A"}</p>
            <p><strong>Funding Need:</strong> {user.fundingNeed || "N/A"}</p>
            {user.pitchDeckUrl && (
              <p>
                <strong>Pitch Deck:</strong>{" "}
                <a href={user.pitchDeckUrl} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                  View Pitch Deck
                </a>
              </p>
            )}
          </div>

          <EditProfileModal
            open={editOpen}
            onClose={() => setEditOpen(false)}
            user={user}
            onProfileUpdated={handleProfileUpdated}
          />
        </div>
      )}

      {/* Collaboration Requests */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Collaboration Requests</h2>
        {requests.length === 0 ? (
          <p>No collaboration requests yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {requests.map((req) => (
              <Card key={req._id}>
                <h3 className="text-xl font-semibold">{req.investorId.name}</h3>
                <p className="text-sm text-gray-600">{req.investorId.bio || "No bio provided."}</p>
                <p className="mt-2">
                  <strong>Status:</strong>{" "}
                  <span className={`font-semibold ${
                    req.status === "Pending"
                      ? "text-yellow-500"
                      : req.status === "Accepted"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                    {req.status}
                  </span>
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Investors Section */}
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
    unread={unread[inv._id]}
  />
))}

          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EntrepreneurDashboard;
