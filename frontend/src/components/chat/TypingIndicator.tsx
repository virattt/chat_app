import React from 'react';
import '../css/TypingIndicator.css'

interface TypingIndicatorProps {
  isTyping: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isTyping }) => {
  if (!isTyping) return <div/>

  return (
    <div className={`typing-indicator-container ${isTyping ? 'visible' : 'hidden'}`}>
      <div className="typing-indicator-dot" />
      <div className="typing-indicator-dot" />
      <div className="typing-indicator-dot" />
    </div>
  );
};

export default TypingIndicator;