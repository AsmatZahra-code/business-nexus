
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import socket from "../utils/socket";
import axios from "../api/axiosConfig";
import defAvatar from '../assets/avatar-def.png'
const Chat = () => {
  const { userId: receiverId } = useParams(); // person you're chatting with
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");


  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const chatContainerRef = useRef(null);
console.log("Debug IDs", { userId, receiverId });
  // ✅ NEW: store full user data
  const [currentUser, setCurrentUser] = useState(null);
  const [receiverUser, setReceiverUser] = useState(null);

  useEffect(() => {
    if (!userId || !token) return;

    socket.auth = { userId };
    socket.connect();

    const roomId = [userId, receiverId].sort().join("_");
    socket.emit("joinRoom", { senderId: userId, receiverId });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    const fetchMessages = async () => {
      const res = await axios.get(`/chat/${receiverId}?currentUserId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    };

    // ✅ NEW: fetch both users
    const fetchUsers = async () => {
      try {
        const [currentRes, receiverRes] = await Promise.all([
          axios.get(`/profile/${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`/profile/${receiverId}`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setCurrentUser(currentRes.data);
        setReceiverUser(receiverRes.data);
        console.log("Fetched profiles", {
  currentUser: currentRes.data,
  receiverUser: receiverRes.data,
});
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    fetchMessages();
    fetchUsers();

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [receiverId, userId, token]);

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 const sendMessage = () => {
  if (!input.trim()) return;

  const message = {
    senderId: userId,
    receiverId,
    message: input,
    timestamp: new Date().toISOString(),
  };

  socket.emit("sendMessage", message); // Let socket deliver it
  setInput(""); // Clear input only
};


 const getAvatar = (msg) => {
  const senderId = typeof msg.senderId === "object" ? msg.senderId._id : msg.senderId;
  const isOwnMessage = senderId === currentUser?._id;


  console.log("getAvatar", {
    msgSenderId: senderId,
    isOwnMessage,
    userId,
    currentUserAvatar: currentUser?.avatar,
    receiverUserAvatar: receiverUser?.avatar,
  });

  const avatarPath = isOwnMessage
    ? currentUser?.avatar
    : receiverUser?.avatar;

  return avatarPath
    ? `http://localhost:5000${avatarPath}?t=${new Date().getTime()}`
    : defAvatar;
};



  return (
    <div className="p-4 h-screen flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Chat</h2>
      <div className="flex-1 overflow-y-auto space-y-2">
      
       {messages.map((msg, idx) => {
         console.log("Rendering message", msg);
  const isOwnMessage =
    (typeof msg.senderId === "object" ? msg.senderId._id : msg.senderId) === userId;

  return (
    <div
      key={idx}
      className={`flex items-end ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      {!isOwnMessage && (
        <img
          src={getAvatar(msg)}
          alt="avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
      )}
      <div
        className={`p-2 rounded-lg max-w-xs ${
          isOwnMessage ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        <p>{msg.message}</p>
        <small className="text-xs block mt-1">
          {new Date(msg.timestamp).toLocaleTimeString()}
        </small>
      </div>
      {isOwnMessage && (
        <img
          src={getAvatar(msg)}
          alt="avatar"
          className="w-8 h-8 rounded-full ml-2"
        />
      )}
    </div>
  );
})}

        <div ref={chatContainerRef}></div>
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          className="border flex-1 p-2 rounded-l-lg"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded-r-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
