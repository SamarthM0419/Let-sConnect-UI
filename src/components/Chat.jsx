import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState(["Hello world"]);

  useEffect(()=>{

  },[])


  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col rounded-lg">
      <h1 className="p-5 border-b border-gray-600 text-center font-bold text-3xl rounded-">
        Chat
      </h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((messgae) => {
          return (
            <div className="chat chat-start">
              <div className="chat-header">
                Samarth
                <time className="text-xs opacity-50"> 2 hours ago</time>
              </div>
              <div className="chat-bubble">You were the Chosen One!</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex">
        <input className="flex-1 border border-gray-600 text-white rounded-lg p-2" />
        <button className="btn btn-secondary ml-2">Send▶️</button>
      </div>
    </div>
  );
};

export default Chat;
