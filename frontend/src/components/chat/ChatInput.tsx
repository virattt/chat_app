// ChatInput.tsx

import React, { MutableRefObject, useState } from 'react';
import styled from 'styled-components';
import ReconnectingWebSocket from "reconnecting-websocket";
import { Message } from "../../data/Message";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ChatInputProps = {
  onNewMessage: (message: Message) => void;
  setLoading: (isLoading: boolean) => void;
  webSocket: MutableRefObject<ReconnectingWebSocket | null>;
  chatId: string | null;
};

export const ChatInput: React.FC<ChatInputProps> = ({onNewMessage, webSocket, chatId, setLoading}) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();

      if (message.trim() === '') return;

      // If there is no chatId, create a new chat.
      if (!chatId) {
        toast.error('Please select or create a new Chat to send a message.');
        return;
      } else {
        // If there is a chatId, just send the message.
        sendWebSocketMessage(chatId);
      }
    }

    // Function for sending a message through the WebSocket connection.
    const sendWebSocketMessage = (id: string) => {
      webSocket.current?.send(
        JSON.stringify({
          message: message,
          chat_id: id,
        })
      );
      const newMessage = {sender: 'User', content: message};
      onNewMessage(newMessage);  // Add this line
      setMessage('');
      setLoading(true); // Set loading to true when sending a message
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <Button type="submit">Send</Button>
      </Form>
    );
  }
;

const Form = styled.form`
  display: flex;
  padding: 10px;
  border-top: 1px solid #eee;
`;

const Input = styled.input`
  flex-grow: 1;
  border: 1px solid #eee;
  border-radius: 3px;
  padding: 10px;
  margin-right: 10px;
  &:focus,
  &:active {
    border-color: #1C1C1C;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #1C1C1C;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1em;
  &:hover {
    background-color: #333333; /* Change this to the desired lighter shade */
  }
`;
