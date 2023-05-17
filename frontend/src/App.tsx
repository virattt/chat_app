// ChatApp.tsx

import React, { useEffect, useRef, useState } from 'react';
import { Sidebar } from './components/chat/Sidebar';
import { ChatBox } from './components/chat/ChatBox';
import { ChatInput } from "./components/chat/ChatInput";
import styled from 'styled-components';
import ReconnectingWebSocket from "reconnecting-websocket";

type Message = {
  sender: string;
  content: string;
};

export const App = () => {
  // TODO - make chatId dynamic
  const [currentChatId, setCurrentChatId] = useState<string | null>("1");
  const [messages, setMessages] = useState<Message[]>([]);
  const webSocket = useRef<ReconnectingWebSocket | null>(null);
  const [loading, setLoading] = useState(false);

  // Setup websocket connection when chatId changes
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
    }
    return () => {
      webSocket.current?.close();
    };
  }, [currentChatId]);

  useEffect(() => {
    // TODO: Fetch previous messages for the current chat id and update the state.
  }, [currentChatId]);

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const handleNewMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  return (
    <AppContainer>
      <Sidebar onChatSelect={handleChatSelect}/>
      <ChatContainer>
        <ChatBox messages={messages} isLoading={loading}/>
        <ChatInput onNewMessage={handleNewMessage} webSocket={webSocket} chatId={currentChatId} setLoading={setLoading}/>
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
