import React, { useEffect, useRef, useState } from 'react';
import './css/App.css';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import ReconnectingWebSocket from "reconnecting-websocket";
import MultilineText from "./components/MultilineText";
import { styled } from '@mui/system';


interface Message {
  text: string;
  isUser: boolean;
}

const CustomTextField = styled(TextField)({
  width: '100%',
  '& .MuiInputBase-root': {
    height: '100%',
  },
});

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const chatSocket = useRef<ReconnectingWebSocket | null>(null);

  useEffect(() => {
    chatSocket.current = new ReconnectingWebSocket('ws://localhost:8000/ws/chat/');

    chatSocket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const message = data['message'];

      setMessages((prevMessages) => [...prevMessages, {text: message, isUser: false}]);
    };

    chatSocket.current.onclose = () => {
      console.error('Chat socket closed unexpectedly');
    };

    return () => {
      chatSocket.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return;

    chatSocket.current?.send(
      JSON.stringify({
        message: input,
      })
    );

    setMessages([...messages, {text: input, isUser: true}]);
    setInput('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Chat App
      </Typography>
      <Box my={2}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
            <MultilineText
              variant="body1"
              className={`message-text ${msg.isUser ? 'user' : 'bot'}`}
              text={msg.text}
            />
          </div>
        ))}
      </Box>
      <Grid container spacing={1} alignItems="stretch">
        <Grid item xs={9}>
          <CustomTextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
            placeholder="Type your message..."
          />
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="primary" onClick={sendMessage} sx={{height: '100%', width: '100%'}}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
