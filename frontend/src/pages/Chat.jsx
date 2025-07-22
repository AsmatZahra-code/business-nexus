import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import socket from "../utils/socket";
import axios from "../api/axiosConfig";

const Chat = () => {
  const { userId: receiverId } = useParams(); // person you're chatting with
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!userId || !token) return;

    socket.auth = { userId };
    socket.connect();

    // Join private room
    const roomId = [userId, receiverId].sort().join("_");
    // socket.emit("joinRoom", roomId);
socket.emit("joinRoom", { senderId: userId, receiverId });

    // Listen for incoming messages
    // socket.on("newMessage", (msg) => {
    //   setMessages((prev) => [...prev, msg]);
    // });
socket.on("receiveMessage", (msg) => {
  setMessages((prev) => [...prev, msg]);
});

    // Load message history
    // const fetchMessages = async () => {
    //   const res = await axios.get(`/chat/${receiverId}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   setMessages(res.data);
    // };
    const fetchMessages = async () => {
  const res = await axios.get(`/chat/${receiverId}?currentUserId=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  setMessages(res.data);
};

    fetchMessages();

    return () => {
      socket.off("newMessage");
      socket.disconnect();
    };
  }, [receiverId, userId, token]);

  useEffect(() => {
    // Auto-scroll
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

    socket.emit("sendMessage", message);
    setMessages((prev) => [...prev, message]);
    setInput("");
  };

  return (
    <div className="p-4 h-screen flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Chat</h2>
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-2 rounded-lg max-w-xs ${
                msg.senderId === userId ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <p>{msg.message}</p>
              <small className="text-xs block mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </small>
            </div>
          </div>
        ))}
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
