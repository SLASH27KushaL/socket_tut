import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Container, TextField, Typography, Button, Box } from '@mui/material';

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected');
    });

    newSocket.on('welcome', (msg) => {
      console.log(msg);
    }); 

newSocket.on("message",(e)=>{
  console.log(e);
})
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    socket.emit("message", message);
    setMessage(""); // Clear the input
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="div" gutterBottom>
        Welcome to Socket.IO
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </Box>
    </Container>
  );
}

export default App;
