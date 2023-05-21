// Sidebar.tsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type Chat = {
  id: string;
  name: string;
};

type SidebarProps = {
  onChatSelect: (chatId: string | null) => void;
  selectedChatId: string | null; // Add this prop.
};

export const Sidebar: React.FC<SidebarProps> = ({onChatSelect, selectedChatId}) => {
  const [chats, setChats] = useState<Chat[]>([]);

  // Fetch chats when the selectedChatId changes
  useEffect(() => {
    fetchChats();
  }, [selectedChatId]);

  const fetchChats = () => {
    fetch('http://localhost:8000/api/chats/')
      .then(response => response.json())
      .then(data => {
        setChats(data.chats)
      });
  };

  const createChat = () => {
    fetch('http://localhost:8000/api/chats/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: 'New Chat'})  // Adjust this as necessary.
    })
      .then(response => response.json())
      .then(newChat => {
        setChats(prevChats => [...prevChats, newChat]);
        onChatSelect(newChat.id);  // Select the new chat automatically
      });
  };

  const onDeleteChat = (chatId: string) => {
    fetch(`http://localhost:8000/api/chats/${chatId}/`, {
      method: 'DELETE',
    })
      .then(() => {
        // Update the state to remove the deleted chat
        setChats(chats.filter(chat => chat.id !== chatId));
        // If the deleted chat was the currently selected one, nullify the selection
        if (chatId === selectedChatId) {
          onChatSelect(null);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <SidebarContainer>
      <Button onClick={createChat}>+ New Chat</Button>
      {chats.map((chat) => (
        <ChatRow
          key={chat.id}
          onClick={() => onChatSelect(chat.id)}
          isSelected={chat.id === selectedChatId} // Pass this as a prop.
        >
          Chat {chat.id}
          <FontAwesomeIcon icon={faTrash} onClick={(e) => {
            e.stopPropagation(); // Prevent the chat row's onClick event from firing.
            onDeleteChat(chat.id);
          }}/>
        </ChatRow>
      ))}
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #1C1C1C;
  overflow-y: auto;
`;

// Use this prop to conditionally style the chat row:
const ChatRow = styled.div<{ isSelected?: boolean }>`
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#333' : 'transparent')};
  &:hover {
    background-color: #333;
  }
  color: white;
  font-size: 1em;
  display: flex; // Add this.
  justify-content: space-between; // Add this.
`;
const Button = styled.button`
  padding: 20px;
  border: none;
  background-color: #1C1C1C;
  width: 100%;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  border-color: #fff
  font-size: 1em;
  &:hover {
    background-color: #333333; /* Change this to the desired lighter shade */
  }
`;
