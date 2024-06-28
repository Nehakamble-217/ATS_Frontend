import React, { useEffect, useState, CSSProperties } from "react";
import "./chatRoom.css";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

let stompClient = null;
const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  let [color, setColor] = useState("#ffcb9b");

  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
    file: null,
  });
  const { employeeId } = useParams();

  useEffect(() => {
    fetchUsername();
  }, []);

  useEffect(() => {
    if (userData.username && !userData.connected) {
      connect(userData.username);
    }
  }, [userData.username]);

  const fetchUsername = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.39:8891/api/ats/157industries/employeeName/${employeeId}`
      );
      let result;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = await response.text();
      }

      const username = result.employeeName || result; // Adjust depending on the response structure

      setUserData((prevUserData) => ({
        ...prevUserData,
        username: username,
      }));
    } catch (error) {
      console.error("Failed to fetch username:", error);
    }
  };

  const connect = (username) => {
    let Sock = new SockJS("http://192.168.1.39:8891/ws");
    stompClient = over(Sock);
    stompClient.connect({}, () => onConnected(username), onError);
  };

  const onConnected = (username) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      connected: true,
    }));
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe("/user/" + username + "/private", onPrivateMessage);
    userJoin(username);
  };

  const userJoin = (username) => {
    var chatMessage = {
      senderName: username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        setPublicChats((prevChats) => [...prevChats, payloadData]);
        break;
      case "FILE":
        if (payloadData.senderName !== userData.username) {
          setPublicChats((prevChats) => [...prevChats, payloadData]);
        }
        break;
      default:
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      message: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUserData((prevUserData) => ({
      ...prevUserData,
      file,
    }));
  };

  const sendValue = () => {
    if (userData.message.trim() !== "") {
      sendMessage();
    }
    if (userData.file) {
      uploadFile();
    }
  };

  const sendMessage = () => {
    const messageData = {
      senderName: userData.username,
      message: userData.message,
      status: "MESSAGE",
    };
    stompClient.send("/app/message", {}, JSON.stringify(messageData));
    setUserData((prevUserData) => ({
      ...prevUserData,
      message: "",
    }));
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", userData.file);
    formData.append("senderName", userData.username);

    fetch("http://192.168.1.39:8891/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("File uploaded successfully");

          const fileMessageData = {
            senderName: userData.username,
            fileName: userData.file.name,
            fileUrl: URL.createObjectURL(userData.file),
            status: "FILE",
          };
          stompClient.send("/app/message", {}, JSON.stringify(fileMessageData));

          setUserData((prevUserData) => ({
            ...prevUserData,
            file: null,
          }));
          setPublicChats((prevChats) => [
            ...prevChats,
            {
              senderName: userData.username,
              fileName: userData.file.name,
              fileUrl: URL.createObjectURL(userData.file),
            },
          ]);
        } else {
          console.error("Failed to upload file");
        }
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const openFile = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-box">
          <div className="member-list">
            <ul>
              <div>
                <h1>{userData.username} Chat Room</h1>
              </div>
              <li
                onClick={() => {
                  setTab("CHATROOM");
                }}
                className={`member ${tab === "CHATROOM" && "active"}`}
              >
                Chatroom
              </li>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => {
                    setTab(name);
                  }}
                  className={`member ${tab === name && "active"}`}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {tab === "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {publicChats.map((chat, index) => (
                  <li
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    {chat.message ? (
                      <div className="message-data">{chat.message}</div>
                    ) : (
                      <div className="file-data">
                        <p>File: {chat.fileName}</p>

                        <img
                          src={chat.fileUrl}
                          alt=""
                          style={{ width: "100%", height: "200px" }}
                        />
                        <button onClick={() => openFile(chat.fileUrl)}>
                          Open File
                        </button>
                      </div>
                    )}
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul>
              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <input type="file" onChange={handleFileChange} />
                <button type="button" onClick={sendValue}>
                  Send
                </button>
              </div>
            </div>
          )}
          {tab !== "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {[...privateChats.get(tab)].map((chat, index) => (
                  <li
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    {chat.message ? (
                      <div className="message-data">{chat.message}</div>
                    ) : (
                      <div className="file-data">
                        <p>File uploaded by {chat.senderName}</p>
                        <button onClick={() => openFile(chat.fileUrl)}>
                          Open File
                        </button>
                      </div>
                    )}
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul>
              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <input type="file" onChange={handleFileChange} />
                <button type="button" onClick={sendValue}>
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="register">
          <HashLoader
            color={color}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
