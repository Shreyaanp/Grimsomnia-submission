import React, { useState , useRef} from 'react';
import './Chatbot.css';
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Container,
  Heading,
  Spinner,
  Image,
} from '@chakra-ui/react';
import axios from 'axios';
const Chatbot = () => {
  const fileInputRef = useRef(null);
  const [usermessage, setUsermessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: 'Welcome to the chatbot!',
      sender: 'bot',
    },
  ]);
  const [history, setHistory] = useState(['']);
  const [responseTime, setResponseTime] = useState(null);
  const chatApi = "https://c414-35-185-54-143.ngrok.io"
  const endpoint =  chatApi;

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);

    try {
      const response = await axios.post(endpoint + "/uploadfile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded:", response.data);
    } catch (error) {
      console.log("File upload failed:", error);
    }
  };
  const handleSendMessage = async () => {
    if (usermessage === '') {
      return;
    }

    const startTime = Date.now();  // Start the timer

    setLoading(true);

    setMessages([...messages, { text: usermessage, sender: 'user', timestamp: new Date() }]);
    setHistory([...history, usermessage]);

    try {
      const response = await axios.post(endpoint + '/chatbot', {
        body: JSON.stringify({
          messageResponse: usermessage,
          history: history,
        }),
      });

      const endTime = Date.now();  // End the timer
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2);  // Time in seconds

      setResponseTime(timeTaken);  // Set the time taken for the response

      const chatResult = response.data.messageResponse.response;
      setMessages([...messages, { text: usermessage, sender: 'user', timestamp: new Date() }, { text: chatResult, sender: 'bot', timestamp: new Date(), responseTime: timeTaken }]);
      setHistory([...history, usermessage, chatResult]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setUsermessage('');
    }
  };

  return (
    <Container maxW="full" centerContenta >

      <Heading mb={4}>Chacha Choudhary Chatbot</Heading>
      <VStack
        className="chat-area"  // custom class for full-screen chat
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
          >
            <Text
              className={message.sender === 'user' ? 'user-message' : 'bot-message'} // custom classes for messages
            >
              {message.text}
            </Text>
          </Box>
        ))}
      </VStack>
      <Box className="input-area"> {/* custom class for input area */}
        <Input
          flex={1}
          value={usermessage}
          onChange={(e) => setUsermessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
        />
        <Button ml={2} onClick={handleSendMessage} colorScheme="blue" isLoading={loading}>
          {loading ? <Spinner /> : 'Send'}
        </Button>
      </Box>
      <Box mt={4}>
        <input ref={fileInputRef} type="file" />
        <Button ml={2} onClick={handleFileUpload} colorScheme="teal">
          Upload File
        </Button>
      </Box>
    </Container>
  );
};

export default Chatbot;
