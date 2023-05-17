// Message.tsx

import React from 'react';
import styled from 'styled-components';

type MessageProps = {
  sender: string;
  content: string;
  isUser: boolean;
};

const Container = styled.div<{ isUser: boolean }>`
  background-color: ${({ isUser }) => (isUser ? 'white' : '#F5F5F5')};
  display: flex;
  justify-content: center;
  width: 100%; // Make the container full width
  border-top: 0.5px solid #c4c4c4; // Add a thin gray line to the bottom
`;

const Bubble = styled.div<{ isUser: boolean }>`
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  width: 40%; // Set a fixed width for the bubble
  text-align: left; // Left-align the text
  font-family: 'Inter', sans-serif; // Set the font to Inter
  font-size: 14px;
`;

const Sender = styled.div`
  font-weight: 700; // Make the sender name bold
  font-family: 'Inter', sans-serif; // Set the font to Inter
  margin-bottom: 8px;
`;

export const ChatMessage: React.FC<MessageProps> = ({sender, content, isUser}) => (
  <Container isUser={isUser}>
    <Bubble isUser={isUser}>
      <Sender>{sender}</Sender>
      {content.toString().split('\n').map((line, index) => (
        <div key={index} style={{ lineHeight: '1.5' }}>{line}</div>
      ))}
    </Bubble>
  </Container>
);
