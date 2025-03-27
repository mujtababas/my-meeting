import React, { useState } from 'react';

interface ChatProps {
  sendMessage: (message: string) => void;
  messages: { sender: string; text: string }[];
}

const Chat: React.FC<ChatProps> = ({ sendMessage, messages }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold">{message.sender}:</span> {message.text}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="flex">
          <input
            type="text"
            className="flex-1 bg-gray-800 text-white rounded-l-md py-2 px-3 focus:outline-none"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;