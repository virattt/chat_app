// Message.tsx

import React from 'react';
import styled from 'styled-components';

type MessageProps = {
  sender: string;
  content: string;
  isUser: boolean;
};

const Container = styled.div<{ isUser: boolean }>`
  background-color: ${({isUser}) => (isUser ? 'white' : '#ddd')};
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Sender = styled.p`
  font-weight: bold;
`;

export const ChatMessage: React.FC<MessageProps> = ({sender, content, isUser}) => (
  <Container isUser={isUser}>
    <Sender>{sender}</Sender>
    {content.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ))}
  </Container>
);
