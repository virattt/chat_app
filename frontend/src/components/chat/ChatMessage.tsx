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
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  width: 100%; // Make the container full width
  border-top: 0.5px solid #c4c4c4; // Add a thin gray line to the bottom
`;

const Bubble = styled.div<{ isUser: boolean }>`
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  width: 50%; // Set a fixed width for the bubble
  display: flex; // Make it a flex container
  align-items: baseline; // Align items to the text baseline
  font-family: 'Inter', sans-serif; // Set the font to Inter
  font-size: 16px;
`;

const Content = styled.div`
  margin-left: 14px;
  line-height: 1.5;
  font-size: 16px;
`;

const Sender = styled.div`
  font-weight: 700; // Make the sender name bold
  font-family: 'Inter', sans-serif; // Set the font to Inter
  font-size: 16px;
  min-width: 50px;
`;

export const ChatMessage: React.FC<MessageProps> = ({sender, content, isUser}) => (
  <Container isUser={isUser}>
    <Bubble isUser={isUser}>
      <Sender>{sender}</Sender>
      <Content>
        {content.toString().split('\n').map((line, index) => (
          line === '' ? <br key={index}/> : <div key={index}>{line}</div>
        ))}
      </Content>
    </Bubble>
  </Container>
);
