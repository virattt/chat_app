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

  // Set up websocket connection when currentChatId changes
  useEffect(() => {
    if (currentChatId) {
      webSocket.current = new ReconnectingWebSocket(`ws://localhost:8000/ws/chat/${currentChatId}/`);
      webSocket.current.onmessage = (event) => {
        setLoading(false)
        const data = JSON.parse(event.data);
        const newMessage = {sender: 'AI', content: data['message']};
        handleNewMessage(newMessage);
      };

      webSocket.current.onclose = () => {
        console.error('Chat socket closed unexpectedly');
      };

      // Fetch chat messages for currentChatId
      fetch(`http://localhost:8000/api/chats/${currentChatId}/messages/`)
        .then(response => response.json())
        .then(data => {
          setMessages(data)
        });
    }
    return () => {
      webSocket.current?.close();
    };
  }, [currentChatId]);

  const handleChatSelect = (chatId: string | null) => {
    if (currentChatId === chatId) return; // Prevent unnecessary re-renders.
    setCurrentChatId(chatId);
  };

  const handleNewMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  return (
    <AppContainer>
      <Sidebar
        onChatSelect={handleChatSelect}
        selectedChatId={currentChatId}
      />
      <ChatContainer>
        <ToastContainer/>
        <ChatBox messages={messages} isLoading={loading}/>
        <ChatInput
          onNewMessage={handleNewMessage}
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
