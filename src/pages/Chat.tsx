
import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { Send, Search, User } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: number;
  sender: 'user' | 'contact';
  content: string;
  time: string;
}

const Chat = () => {
  const [message, setMessage] = useState('');
  const [activeContact, setActiveContact] = useState<number>(1);

  const contacts: Contact[] = [
    { id: 1, name: 'Alex Johnson', lastMessage: 'Can you share the notes?', time: '10:30 AM', unread: 2, online: true },
    { id: 2, name: 'Sarah Williams', lastMessage: 'See you at the study session', time: 'Yesterday', unread: 0, online: true },
    { id: 3, name: 'Michael Brown', lastMessage: 'Thanks for your help!', time: 'Yesterday', unread: 0, online: false },
    { id: 4, name: 'Physics Study Group', lastMessage: 'Prof: Quiz on Friday', time: '2 days ago', unread: 5, online: true },
    { id: 5, name: 'Calculus Team', lastMessage: 'Let\'s meet tomorrow', time: '3 days ago', unread: 0, online: false },
  ];

  const messages: Message[] = [
    { id: 1, sender: 'contact', content: 'Hey there! How\'s your study going?', time: '10:20 AM' },
    { id: 2, sender: 'user', content: 'It\'s going well. I\'m working on the physics assignment.', time: '10:22 AM' },
    { id: 3, sender: 'contact', content: 'Nice! Have you covered chapter 7 yet?', time: '10:25 AM' },
    { id: 4, sender: 'user', content: 'Yes, just finished it. It was challenging but interesting.', time: '10:26 AM' },
    { id: 5, sender: 'contact', content: 'Can you share the notes you took? I\'m struggling with some concepts.', time: '10:30 AM' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message
      setMessage('');
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-5rem)] flex border rounded-lg overflow-hidden bg-white">
        {/* Contacts Sidebar */}
        <div className="w-80 border-r flex flex-col bg-gray-50">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search messages or contacts"
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-100 transition-colors ${
                  activeContact === contact.id ? 'bg-primary-50' : ''
                }`}
                onClick={() => setActiveContact(contact.id)}
              >
                <div className="flex items-start">
                  <div className="relative mr-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <User size={20} className="text-gray-600" />
                    </div>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium truncate">{contact.name}</h3>
                      <span className="text-xs text-gray-500">{contact.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && (
                    <div className="ml-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">{contact.unread}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b flex items-center">
            <div className="relative mr-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <User size={20} className="text-gray-600" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="font-semibold">Alex Johnson</h2>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : ''}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-100' : 'text-gray-500'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Chat;
