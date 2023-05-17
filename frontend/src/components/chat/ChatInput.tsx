// ChatInput.tsx

import React, { MutableRefObject, useState } from 'react';
import styled from 'styled-components';
import ReconnectingWebSocket from "reconnecting-websocket";

type Message = {
  sender: string;
  content: string;
};

type ChatInputProps = {
  onNewMessage: (message: Message) => void;
  setLoading: (isLoading: boolean) => void;
  webSocket: MutableRefObject<ReconnectingWebSocket | null>;
  chatId: string | null;
};

export const ChatInput: React.FC<ChatInputProps> = ({onNewMessage, webSocket, chatId, setLoading}) => {
  const [message, setMessage] = useState('');

  // // Setup websocket connection when chatId changes
  // useEffect(() => {
  //   if (chatId) {
  //     ws.current = new ReconnectingWebSocket(`ws://localhost:8000/ws/chat/${chatId}/`);
  //     ws.current.onmessage = (event) => {
  //       const message = JSON.parse(event.data);
  //       onNewMessage(message);
  //     };
  //
  //     ws.current.onclose = () => {
  //       console.error('Chat socket closed unexpectedly');
  //     };
  //   }
  //   return () => {
  //     ws.current?.close();
  //   };
  // }, [chatId, onNewMessage]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (message.trim() === '') return;

    webSocket.current?.send(
      JSON.stringify({
        message: message,
        chat_id: chatId,
      })
    );
    // setMessages([...messages, {text: input, isUser: true}]);
    const newMessage = {sender: 'User', content: message};
    onNewMessage(newMessage);  // Add this line
    setMessage('');
    setLoading(true); // Set loading to true when sending a message
    // setIsTyping(true);
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
};

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
