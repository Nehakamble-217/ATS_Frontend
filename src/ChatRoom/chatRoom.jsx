import React, { useEffect, useState} from 'react';
import "./chatRoom.css";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useParams } from 'react-router-dom';

var stompClient = null;
const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: '',
        file: null
    });
      const { employeeId } = useParams();

    
    useEffect(() => {
        console.log(userData);
    }, [userData]);

    useEffect(() => {
        fetchUsername();
    }, []);

    const fetchUsername = async () => {
    try {
        // Replace with the actual endpoint to fetch the username
        const response = await fetch(`http://192.168.1.35:8891/api/ats/157industries/employeeName/${employeeId}`);
        let result;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            result = await response.json();
        } else {
            result = await response.text();
        }

        const username = result.employeeName || result; // Adjust depending on the response structure

        setUserData(prevUserData => ({
            ...prevUserData,
            username: username
        }));
        connect(username);
    } catch (error) {
        console.error('Failed to fetch username:', error);
    }
};



    
    const connect = (username) => {
        let Sock = new SockJS('http://localhost:8891/ws');
        stompClient = over(Sock);
 stompClient.connect({}, () => onConnected(username), onError);    }

    const onConnected = (username) => {
        setUserData(prevUserData => ({
            ...prevUserData,
            connected: true
        }));
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + username + '/private', onPrivateMessage);
        userJoin(username);
    }

    const userJoin = (username) => {
        var chatMessage = {
            senderName: username,
            status: "JOIN"    
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
           case "FILE":
            if (payloadData.senderName !== userData.username) {
        // Add file message to public chats only if sender is not the current user
               publicChats.push(payloadData);
               setPublicChats([...publicChats]);
            }
            break;
        }
    }

    const onPrivateMessage = (payload) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);
    }

    const handleMessage = (event) => {
        const {value} = event.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            message: value
        }));
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setUserData(prevUserData => ({
            ...prevUserData,
            file
        }));
    }

const sendValue = () => {
    console.log("Sending value...");
    console.log("Message:", userData.message);
    console.log("File:", userData.file);
      if (stompClient) {
            if (userData.message.trim() !== "") {
                const messageData = {
                    senderName: userData.username,
                    message: userData.message,
                    status: "MESSAGE"
                };
                stompClient.send("/app/message", {}, JSON.stringify(messageData));
                setUserData(prevUserData => ({
                    ...prevUserData,
                    message: ""
                }));
            }}
    if (stompClient && userData.file ) {
    // Upload the file to the server
    const formData = new FormData();
    formData.append('file', userData.file);
    formData.append('senderName', userData.username);
    formData.append("message",userData.message)

    
    
    fetch('http://localhost:8891/upload', {
        method: 'POST',
        body: formData
    })
    
    
    .then(response => {
        if (response.ok) {
            // File uploaded successfully
            console.log('File uploaded successfully');
            
            // Send the file message to the appropriate destination
            const fileMessageData = {
                senderName: userData.username,
                fileName: userData.file.name,
                fileUrl: URL.createObjectURL(userData.file),
                status: "FILE"
            };
            stompClient.send("/app/message", {}, JSON.stringify(fileMessageData));

            // Clear the file input and update UI
            setUserData(prevUserData => ({
                ...prevUserData,
                file: null
            }));
            setPublicChats(prevChats => [
    ...prevChats,
    {
        senderName: userData.username,
        fileName: userData.file.name,
        fileUrl: URL.createObjectURL(userData.file) // Use the fileUrl from state
    }
    
]);
        } else {
            console.error('Failed to upload file');
        }
    })
    .catch(error => {
        console.error('Error uploading file:', error);
    });
}

}



    const handleUsername = (event) => {
        const {value} = event.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            username: value
        }));
    }

    const openFile = (fileUrl) => {
        window.open(fileUrl, '_blank');
    }

    const registerUser = () => {
        connect();
    }

    return (
        <div className="container">
            {userData.connected ?
                <div className="chat-box">
                     <div className="member-list">
                        <ul>
                            <div><h1>{userData.username} Chat Room</h1></div>
                            <li onClick={() => { setTab("CHATROOM") }} className={`member ${tab === "CHATROOM" && "active"}`}>Chatroom</li>
                            {[...privateChats.keys()].map((name, index) => (
                                <li onClick={() => { setTab(name) }} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                    {tab === "CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {publicChats.map((chat, index) => (
                                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    {chat.message ? (
                                        <div className="message-data">{chat.message}</div>
                                    ) : (
                                        <div className="file-data">
                                            <p>File: {chat.fileName}</p>
                                            <button onClick={() => openFile(chat.fileUrl)}>Open File</button>
                                        </div>
                                    )}
                                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>
                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                            <input type="file" onChange={handleFileChange} />
                            <button type="button" onClick={sendValue}>Send</button>
                        </div>
                    </div>}
                    {tab !== "CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {[...privateChats.get(tab)].map((chat, index) => (
                                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    {chat.message ? (
                                        <div className="message-data">{chat.message}</div>
                                    ) : (
                                        <div className="file-data">
                                            <p>File uploaded by {chat.senderName}</p>
                                            <button onClick={() => openFile(chat.fileUrl)}>Open File</button>
                                        </div>
                                    )}
                                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>
                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                            <input type="file" onChange={handleFileChange} />
                            <button type="button" onClick={sendValue}>Send</button>
                        </div>
                    </div>}
                </div>
                :
                
                <div className="register">
                    <p>Connecting...</p>
                </div>
            }
        </div>
    );
}

export default ChatRoom;
