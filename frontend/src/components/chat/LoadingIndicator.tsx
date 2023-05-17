import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingIndicatorProps {
  isLoading: boolean;
}

// Define the pulsating animation
const pulse = keyframes`
  0% {
    background-color: rgba(0, 0, 0, 1);
  }
  50% {
    background-color: rgba(0, 0, 0, 0.5);
  }
  100% {
    background-color: rgba(0, 0, 0, 1);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 40%;
`;

const Rectangle = styled.div`
  width: 8px;
  height: 16px;
  background-color: black;
  animation: ${pulse} 1s infinite ease-in-out;
`;

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({isLoading}) => {
  if (!isLoading) return <div />

  return (
    <Container>
      <InnerContainer>
        <Rectangle />
      </InnerContainer>
    </Container>
  );
};

export default LoadingIndicator;
