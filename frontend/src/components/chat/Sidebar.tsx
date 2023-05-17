// Sidebar.tsx

import React from 'react';
import styled from 'styled-components';

type SidebarProps = {
  onChatSelect: (chatId: string) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ onChatSelect }) => {
  // TODO: Fetch the chat ids and use them to render the list.

  return (
    <SidebarContainer>
      {/* Render chat ids here */}
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #1C1C1C;
  overflow-y: auto;
`;
