// Message.tsx

import React from 'react';
import styled from 'styled-components';

type MessageProps = {
  sender: string;
  content: string;
  isUser: boolean;
};

const Container = styled.div<{ isUser: boolean }>`
  background-color: ${({isUser}) => (isUser ? 'white' : '#F5F5F5')};
  padding: 10px;
  margin-bottom: 4px;
`;

const Sender = styled.p`
  font-weight: bold;
`;

export const ChatMessage: React.FC<MessageProps> = ({sender, content, isUser}) => (
  <Container isUser={isUser}>
    <Sender>{sender}</Sender>
    {content.toString().split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ))}
  </Container>
);
