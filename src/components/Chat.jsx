import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const loggedInUser = useSelector((state) => state.user);
  const userId = loggedInUser?._id;
  const [newMessage, setNewMessage] = useState("");
 
  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: loggedInUser.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + " : " + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  const sendMessage = () => {
    console.log("Button clicked");
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: loggedInUser.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col rounded-lg">
      <h1 className="p-5 border-b border-gray-600 text-center font-bold text-3xl rounded-">
        Chat
      </h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((index, msg) => {
          return (
            <div className="chat chat-start">
              <div className="chat-header">{msg.firstName}</div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex">
        <input
          className="flex-1 border border-gray-600 text-white rounded-lg p-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-secondary ml-2" onClick={sendMessage}>
          Send▶️
        </button>
      </div>
    </div>
  );
};

export default Chat;
