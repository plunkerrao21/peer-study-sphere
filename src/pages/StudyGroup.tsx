
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Search, Bell, User, Video, Settings, Plus, FileText, Book } from 'lucide-react';

const StudyGroup = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message
      setMessage('');
    }
  };

  // Sample data
  const group = {
    name: 'Physics Study Group',
    members: [
      { id: 1, name: 'Alex Johnson', role: 'Admin', online: true },
      { id: 2, name: 'Sarah Williams', role: 'Member', online: true },
      { id: 3, name: 'Michael Brown', role: 'Member', online: false },
      { id: 4, name: 'Emma Davis', role: 'Member', online: false },
      { id: 5, name: 'Robert Wilson', role: 'Member', online: false },
    ],
    messages: [
      { id: 1, sender: 'Alex Johnson', content: 'Hey everyone! Welcome to our Physics study group!', time: '10:15 AM' },
      { id: 2, sender: 'Sarah Williams', content: 'Thanks for creating this. I\'ve been struggling with the latest assignment.', time: '10:18 AM' },
      { id: 3, sender: 'Michael Brown', content: 'Same here. Specifically with problem #3 on quantum mechanics.', time: '10:20 AM' },
      { id: 4, sender: 'Alex Johnson', content: 'Let\'s schedule a video session to go through it together. How about tomorrow at 4 PM?', time: '10:22 AM' },
      { id: 5, sender: 'Sarah Williams', content: 'That works for me!', time: '10:25 AM' },
      { id: 6, sender: 'You', content: 'I can join too. I\'ve already solved the first part of that problem.', time: '10:30 AM' },
    ],
    channels: [
      { id: 1, name: 'general', unread: 0 },
      { id: 2, name: 'assignments', unread: 3 },
      { id: 3, name: 'resources', unread: 0 },
      { id: 4, name: 'off-topic', unread: 2 },
    ],
    resources: [
      { id: 1, name: 'Quantum Mechanics Notes', type: 'PDF', added: '2 days ago' },
      { id: 2, name: 'Physics Formula Sheet', type: 'PDF', added: '1 week ago' },
      { id: 3, name: 'Practice Problems', type: 'DOCX', added: '3 days ago' },
    ],
    upcomingSessions: [
      { id: 1, title: 'Quantum Mechanics Review', date: 'Tomorrow, 4:00 PM' },
      { id: 2, title: 'Exam Preparation', date: 'Friday, 5:30 PM' },
    ],
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            className="text-primary hover:bg-primary-50 p-2 rounded-md"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
          <h1 className="text-xl font-bold">{group.name}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <User size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Group List */}
        <div className="w-64 bg-gray-50 border-r flex flex-col">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search channels"
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="p-4 border-b">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Channels</h2>
            <ul className="space-y-1">
              {group.channels.map((channel) => (
                <li key={channel.id}>
                  <a href="#" className="flex items-center justify-between p-2 rounded-md hover:bg-gray-200 text-gray-700">
                    <span className="text-sm">#{channel.name}</span>
                    {channel.unread > 0 && (
                      <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">
                        {channel.unread}
                      </span>
                    )}
                  </a>
                </li>
              ))}
              <li>
                <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-200 text-gray-700">
                  <Plus size={16} className="mr-2" />
                  <span className="text-sm">Add Channel</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="p-4 border-b">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Upcoming Sessions</h2>
            <ul className="space-y-2">
              {group.upcomingSessions.map((session) => (
                <li key={session.id} className="bg-white rounded-md p-3 border">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{session.title}</p>
                      <p className="text-xs text-gray-500">{session.date}</p>
                    </div>
                    <button className="text-primary p-1 hover:bg-primary-50 rounded">
                      <Video size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Resources</h2>
            <ul className="space-y-1">
              {group.resources.map((resource) => (
                <li key={resource.id}>
                  <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-200 text-gray-700">
                    <FileText size={16} className="mr-2 text-gray-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{resource.name}</p>
                      <p className="text-xs text-gray-500">{resource.added}</p>
                    </div>
                  </a>
                </li>
              ))}
              <li>
                <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-200 text-gray-700">
                  <Plus size={16} className="mr-2" />
                  <span className="text-sm">Add Resource</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Center - Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {group.messages.map((msg) => (
              <div key={msg.id} className="flex items-start">
                <div className="mr-3 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <User size={16} className="text-gray-600" />
                </div>
                <div>
                  <div className="flex items-baseline">
                    <span className="font-medium mr-2">{msg.sender}</span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-gray-800">{msg.content}</p>
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
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="btn btn-primary"
              >
                <Send size={18} className="mr-2" />
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Right Sidebar - Members & Tools */}
        <div className="w-64 bg-gray-50 border-l flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Members ({group.members.length})</h2>
            <ul className="space-y-2">
              {group.members.map((member) => (
                <li key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative mr-2">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <User size={14} className="text-gray-600" />
                      </div>
                      {member.online && (
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-4 border-b">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Tools</h2>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <button className="w-full flex flex-col items-center p-3 bg-white rounded-md border hover:border-primary transition-colors">
                  <Video size={20} className="text-primary mb-1" />
                  <span className="text-xs">Video Call</span>
                </button>
              </li>
              <li>
                <button className="w-full flex flex-col items-center p-3 bg-white rounded-md border hover:border-primary transition-colors">
                  <FileText size={20} className="text-primary mb-1" />
                  <span className="text-xs">Share Files</span>
                </button>
              </li>
              <li>
                <button className="w-full flex flex-col items-center p-3 bg-white rounded-md border hover:border-primary transition-colors">
                  <Book size={20} className="text-primary mb-1" />
                  <span className="text-xs">Quiz</span>
                </button>
              </li>
              <li>
                <button className="w-full flex flex-col items-center p-3 bg-white rounded-md border hover:border-primary transition-colors">
                  <Settings size={20} className="text-primary mb-1" />
                  <span className="text-xs">Settings</span>
                </button>
              </li>
            </ul>
          </div>
          
          <div className="p-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Study Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Homework #3</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Quiz Preparation</span>
                  <span>40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGroup;
