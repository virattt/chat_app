// ChatMenu.tsx
import React from 'react';
import styled from 'styled-components';

interface ChatMenuProps {
  debugMode: boolean;
  setDebugMode: (value: boolean) => void;
}

export const ChatMenu: React.FC<ChatMenuProps> = ({ debugMode, setDebugMode }) => {
  return (
    <Menu>
      <label>
        <input
          type="checkbox"
          checked={debugMode}
          onChange={e => setDebugMode(e.target.checked)}
        />
        Show Agent thoughts
      </label>
    </Menu>
  );
};

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;
