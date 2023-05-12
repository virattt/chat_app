import React, { useEffect, useRef, useState } from 'react';
import './css/App.css';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import ReconnectingWebSocket from "reconnecting-websocket";
import MultilineText from "./components/MultilineText";
import { styled } from '@mui/system';
import TypingIndicator from "./components/TypingIndicator";


interface Message {
  text: string;
  isUser: boolean;
}

const CustomTextField = styled(TextField)({
  width: '100%',
  '& .MuiInputBase-root': {
    height: '100%',
    borderRadius: '1rem',
    backgroundColor: '#fff',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
});

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatSocket = useRef<ReconnectingWebSocket | null>(null);


  useEffect(() => {
    chatSocket.current = new ReconnectingWebSocket('ws://localhost:8000/ws/chat/');

    chatSocket.current.onmessage = (event) => {
      setIsTyping(false);

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
    setIsTyping(true);
  };

  return (
    <div className="chat-app-container">
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Chat App
        </Typography>
        <div className="messages-container">
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
            <TypingIndicator isTyping={isTyping}/>
          </Box>
        </div>
        <div className="message-input-container">
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
              <Button
                variant="contained"
                color="primary"
                onClick={sendMessage}
                sx={{
                  height: '100%',
                  width: '100%',
                  borderRadius: '1rem',
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  backgroundColor: '#007aff',
                }}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default App;
