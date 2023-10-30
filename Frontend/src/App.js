import React from 'react';
import Chat from './Components/chat';
import Avatar from './Components/userdata';
import './Components/Chatbot.css'
export default function App() {
  return (
    <div className='container-big' style={{ display: 'flex', flexDirection: 'row',
      justifyContent: 'space-between', height: '100vh'
     }}>
      <div style={{ width: '80%' }}>
        <Chat />
      </div>
      <div style={{ width: '20%' }}>
        <Avatar />
      </div>
    </div>
  );
}
