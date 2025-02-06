import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import useOnlineStatus from "../hooks/useOnlineStatus";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const loggedInUser = useSelector((state) => state.user);
  const userId = loggedInUser?._id;
  const firstName = loggedInUser?.firstName;
  const trimmedTargetUserId = targetUserId.trim();
  const messagesEndRef = useRef(null);
  const onlineStatus = useOnlineStatus();

  const [newMessage, setNewMessage] = useState("");

  const fetchChat = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + trimmedTargetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text: text,
      };
    });
    console.log(chatMessages);
    setMessages(chatMessages);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!userId || !targetUserId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " : " + text);
      setMessages((messages) => [...messages, { firstName, text, lastName }]);
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: loggedInUser?.firstName,
      lastName: loggedInUser?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  useEffect(() => {
    const socket = createSocketConnection();
    if (messages.length > 0) {
      socket.emit("messageSeen", { userId, targetUserId });
    }
  }, [messages, targetUserId]);

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col rounded-lg">
      <h1 className="p-5 border-b border-gray-600 text-center font-bold text-3xl">
        Chat
        <p
          className={`font-thin text-lg ${
            onlineStatus ? "text-green-500" : "text-red-500"
          }`}
        >
          {onlineStatus ? "online" : "offline"}
        </p>
      </h1>

      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          console.log(msg);
          return (
            <div
              key={index}
              className={
                "chat " +
                (loggedInUser?.firstName === msg.firstName
                  ? " chat-end "
                  : " chat-start ")
              }
            >
              <div className="chat-header">
                {`${msg.firstName}  ${msg.lastName}`}
              </div>
              <div className="chat-bubble chat-bubble-primary">{msg.text}</div>
              <div className="chat-footer opacity-50">
                {msg.seen ? "Seen" : "Delivered"}
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex">
        <input
          className="flex-1 border border-gray-600 text-white rounded-lg p-2"
          value={newMessage}
          placeholder="Type a message..."
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && newMessage.trim() && sendMessage()
          }
        />
        <button
          className="btn btn-secondary ml-2"
          onClick={sendMessage}
          disabled={!newMessage.trim()}
        >
          Send▶️
        </button>
      </div>
    </div>
  );
};

export default Chat;
