import React from 'react';
import '../../css/chat/TypingIndicator.css'
import styled from "styled-components";

interface TypingIndicatorProps {
  isTyping: boolean;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%; // Make the container full width
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 40%; // Set a fixed width for the inner container
`;

const TypingIndicator: React.FC<TypingIndicatorProps> = ({isTyping}) => {
  if (!isTyping) return <div/>

  return (
    <Container>
      <InnerContainer>
        <div className={`typing-indicator-container ${isTyping ? 'visible' : 'hidden'}`}>
          <div className="typing-indicator-dot"/>
          <div className="typing-indicator-dot"/>
          <div className="typing-indicator-dot"/>
        </div>
      </InnerContainer>
    </Container>
  );
};

export default TypingIndicator;
