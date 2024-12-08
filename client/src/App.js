import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatBox from "./components/ChatBox";
import MessageInput from "./components/MessageInput";
import Login from "./Login";

const socket = io("http://localhost:4000");

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setUserId(socket.id);
    });

    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (msg) => {
    if (authenticated && msg.trim()) {
      const messageObject = { msg, username };
      socket.emit("message", messageObject);
    } else {
      alert("You must be authenticated to send a message.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Chat App</h1>

      {authenticated ? (
        <>
          <ChatBox messages={messages} userId={userId} username={username} />
          <MessageInput onSend={sendMessage} />
        </>
      ) : (
        <Login
          setAuthenticated={setAuthenticated}
          setUsername={setUsername}
          username={username}
        />
      )}
    </div>
  );
};

export default App;
