// ChatApp.tsx

import React, { useEffect, useRef, useState } from 'react';
import { Sidebar } from './components/chat/Sidebar';
import { ChatBox } from './components/chat/ChatBox';
import { ChatInput } from "./components/chat/ChatInput";
import styled from 'styled-components';
import ReconnectingWebSocket from "reconnecting-websocket";
import { Message } from "./data/Message";
import { ToastContainer } from 'react-toastify';

export const App = () => {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const webSocket = useRef<ReconnectingWebSocket | null>(null);
  const [loading, setLoading] = useState(false);
  const [debugMessage, setDebugMessage] = useState<string>(""); // TODO (virat) render debug message

  // Set up websocket connection when currentChatId changes
  useEffect(() => {
    if (currentChatId) {
      webSocket.current = new ReconnectingWebSocket(`ws://localhost:8000/ws/chat/${currentChatId}/`);
      webSocket.current.onmessage = (event) => {
        setLoading(false)
        const data = JSON.parse(event.data);
        if (data.type === "debug") {
          // Replace newline characters with <br /> tags
          const formattedToken = data.message.replace(/\n/g, '<br />');
          setDebugMessage(prevMessage => prevMessage + formattedToken);
        } else {
          const newMessage = {sender: 'AI', content: data['message']};
          onNewUserMessage(newMessage);
        }
      };

      webSocket.current.onclose = () => {
        console.error('Chat socket closed unexpectedly');
      };
      // Fetch chat messages for currentChatId
      fetchMessages(currentChatId)
    }
    return () => {
      webSocket.current?.close();
    };
  }, [currentChatId]);

  const onChatSelected = (chatId: string | null) => {
    if (currentChatId === chatId) return; // Prevent unnecessary re-renders.
    if (chatId == null) {
      // Clear messages if no chat is selected
      setMessages([])
    }
    setCurrentChatId(chatId);
  };

  const onNewUserMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const fetchMessages = (currentChatId: string | null) => {
    fetch(`http://localhost:8000/api/chats/${currentChatId}/messages/`)
      .then(response => response.json())
      .then(data => {
        setMessages(data)
      });
  }

  return (
    <AppContainer>
      <Sidebar
        onChatSelected={onChatSelected}
        selectedChatId={currentChatId}
      />
      <ChatContainer>
        {/* Render each message, using dangerouslySetInnerHTML to insert the <br /> tags */}
        {/*<p dangerouslySetInnerHTML={{__html: debugMessage}}/>*/}
        <ToastContainer/>
        <ChatBox messages={messages} isLoading={loading}/>
        <ChatInput
          onNewUserMessage={onNewUserMessage}
          webSocket={webSocket}
          chatId={currentChatId}
          setLoading={setLoading}
        />
      </ChatContainer>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
