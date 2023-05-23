// App.tsx

import React, { useEffect, useRef, useState } from 'react';
import { Sidebar } from './components/chat/Sidebar';
import { ChatBox } from './components/chat/ChatBox';
import { ChatInput } from "./components/chat/ChatInput";
import styled from 'styled-components';
import ReconnectingWebSocket from "reconnecting-websocket";
import { Message } from "./data/Message";
import { ChatMenu } from "./components/chat/debug/ChatMenu";
import { DebugDrawer } from "./components/chat/debug/DebugDrawer";

export const App = () => {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const webSocket = useRef<ReconnectingWebSocket | null>(null);
  const [loading, setLoading] = useState(false);
  const [debugMessage, setDebugMessage] = useState<string>("");
  const [debugMode, setDebugMode] = useState<boolean>(false);

  // Set up websocket connection when currentChatId changes
  useEffect(() => {
    if (currentChatId) {
      webSocket.current = new ReconnectingWebSocket(`ws://localhost:8000/ws/chat/${currentChatId}/`);
      webSocket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "debug") {
          // Debug message received. Replace newline characters with <br /> tags
          const formattedToken = data.message.replace(/\n/g, '<br />');
          setDebugMessage(prevMessage => prevMessage + formattedToken);
        } else {
          // Entire message received
          setLoading(false)
          const newMessage = {sender: 'AI', content: data['message']};
          setMessages(prevMessages => [...prevMessages, newMessage]);
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

  const onNewUserMessage = (chatId: string, message: Message) => {
    webSocket.current?.send(
      JSON.stringify({
        message: message.content,
        chat_id: chatId,
      })
    );
    setMessages(prevMessages => [...prevMessages, message]);
    setLoading(true); // Set loading to true when sending a message
  };

  const onNewChatCreated = (chatId: string) => {
    onChatSelected(chatId)
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
      <Sidebar onChatSelected={onChatSelected} selectedChatId={currentChatId}/>
      <ChatContainer debugMode={debugMode}>
        <ChatMenu debugMode={debugMode} setDebugMode={setDebugMode}/>
        <ChatBox messages={messages} isLoading={loading}/>
        <ChatInput onNewUserMessage={onNewUserMessage} onNewChatCreated={onNewChatCreated} chatId={currentChatId}/>
      </ChatContainer>
      {debugMode && <DebugDrawer message={debugMessage} debugMode={debugMode}/>}
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ChatContainer = styled.div<{ debugMode: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({debugMode}) => debugMode ? '70%' : '100%'};
  transition: all 0.2s; // Smooth transition
`;
