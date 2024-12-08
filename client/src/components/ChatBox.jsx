import React from "react";

const ChatBox = ({ messages, userId, username }) => (
  <div
    style={{
      border: "1px solid #ccc",
      padding: "10px",
      height: "300px",
      overflowY: "scroll",
      backgroundColor: "#f9f9f9",
    }}
  >
    {messages.map((message, index) => (
      <div
        key={index}
        style={{
          textAlign: message.username === username ? "right" : "left",
          margin: "5px 0",
        }}
      >
        <strong>
          {message.username === username ? "You" : `${message.username}`}:
        </strong>{" "}
        {message.msg}
      </div>
    ))}
  </div>
);

export default ChatBox;
