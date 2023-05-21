// ChatBox.tsx

import React from 'react';
import styled from 'styled-components';
import TypingIndicator from "./TypingIndicator";
import { ChatMessage } from "./ChatMessage";

type Message = {
  sender: string;
  content: string;
};

type ChatBoxProps = {
  messages: Message[];
  isLoading: boolean;
};

export const ChatBox: React.FC<ChatBoxProps> = ({messages, isLoading}) => {
  return (
    <MessageList>
      {messages.map((message, index) => (
        <ChatMessage key={index} sender={message.sender} content={message.content} isUser={message.sender.toLowerCase() === 'user'}/>
      ))}
      <TypingIndicator isTyping={isLoading}/>
    </MessageList>
  );
};

const MessageList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;
