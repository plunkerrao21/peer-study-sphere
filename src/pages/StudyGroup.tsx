import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Search, Bell, User, Video, Settings, Plus, FileText, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

  // Sample data - in a real app, this would come from an API
  const group = {
    name: 'Physics Study Group',
    members: [
      { id: 1, name: 'Alex Johnson', role: 'Admin', online: true },
      { id: 2, name: 'Sarah Williams', role: 'Member', online: true },
    ],
    messages: [
      { id: 1, sender: 'Alex Johnson', content: 'Hey everyone! Welcome to our Physics study group!', time: '10:15 AM' },
      { id: 2, sender: 'Sarah Williams', content: 'Thanks for creating this. I\'ve been struggling with the latest assignment.', time: '10:18 AM' },
    ],
    channels: [
      { id: 1, name: 'general', unread: 0 },
      { id: 2, name: 'assignments', unread: 3 },
    ],
    resources: [
      { id: 1, name: 'Quantum Mechanics Notes', type: 'PDF', added: '2 days ago' },
    ],
    upcomingSessions: [
      { id: 1, title: 'Quantum Mechanics Review', date: 'Tomorrow, 4:00 PM' },
    ],
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            className="text-primary bg-primary-50 dark:bg-primary/20 hover:bg-primary hover:text-primary-foreground p-2 rounded-md"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
          <h1 className="text-xl font-bold text-foreground">{group.name}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-muted rounded-full">
            <Bell size={20} className="text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-full">
            <Settings size={20} className="text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-full">
            <User size={20} className="text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Group List */}
        <div className="w-64 bg-muted/30 dark:bg-muted/10 border-r border-border flex flex-col">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                type="text"
                placeholder="Search channels"
                className="w-full pl-10 pr-4 py-2 text-sm bg-background text-foreground"
              />
            </div>
          </div>
          
          <div className="p-4 border-b border-border">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Channels</h2>
            <ul className="space-y-1">
              {group.channels.map((channel) => (
                <li key={channel.id}>
                  <a href="#" className="flex items-center justify-between p-2 rounded-md hover:bg-muted text-foreground">
                    <span className="text-sm">#{channel.name}</span>
                    {channel.unread > 0 && (
                      <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs">
                        {channel.unread}
                      </span>
                    )}
                  </a>
                </li>
              ))}
              <li>
                <a href="#" className="flex items-center p-2 rounded-md hover:bg-muted text-foreground">
                  <Plus size={16} className="mr-2" />
                  <span className="text-sm">Add Channel</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="p-4 border-b border-border">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Upcoming Sessions</h2>
            <ul className="space-y-2">
              {group.upcomingSessions.map((session) => (
                <li key={session.id} className="bg-card rounded-md p-3 border border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{session.title}</p>
                      <p className="text-xs text-muted-foreground">{session.date}</p>
                    </div>
                    <button className="text-primary p-1 hover:bg-primary/10 rounded">
                      <Video size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-4">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Resources</h2>
            <ul className="space-y-1">
              {group.resources.map((resource) => (
                <li key={resource.id}>
                  <a href="#" className="flex items-center p-2 rounded-md hover:bg-muted text-foreground">
                    <FileText size={16} className="mr-2 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{resource.name}</p>
                      <p className="text-xs text-muted-foreground">{resource.added}</p>
                    </div>
                  </a>
                </li>
              ))}
              <li>
                <a href="#" className="flex items-center p-2 rounded-md hover:bg-muted text-foreground">
                  <Plus size={16} className="mr-2" />
                  <span className="text-sm">Add Resource</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Center - Chat Area */}
        <div className="flex-1 flex flex-col bg-card">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {group.messages.map((msg) => (
              <div key={msg.id} className="flex items-start">
                <div className="mr-3 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <User size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-baseline">
                    <span className="font-medium mr-2 text-foreground">{msg.sender}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-foreground">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input - Floating style */}
          <div className="chat-message-input">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-background text-foreground border-none focus:ring-0"
            />
            <Button
              onClick={(e) => handleSendMessage(e as any)}
              className="rounded-full px-3"
              size="sm"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>

        {/* Right Sidebar - Members & Tools */}
        <div className="w-64 bg-muted/30 dark:bg-muted/10 border-l border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Members ({group.members.length})</h2>
            <ul className="space-y-2">
              {group.members.map((member) => (
                <li key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative mr-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <User size={14} className="text-muted-foreground" />
                      </div>
                      {member.online && (
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-card"></div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-4 border-b border-border">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tools</h2>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <button className="w-full flex flex-col items-center p-3 bg-card rounded-md border border-border hover:border-primary transition-colors">
                  <Video size={20} className="text-primary mb-1" />
                  <span className="text-xs text-foreground">Video Call</span>
                </button>
              </li>
              <li>
                <button className="w-full flex flex-col items-center p-3 bg-card rounded-md border border-border hover:border-primary transition-colors">
                  <FileText size={20} className="text-primary mb-1" />
                  <span className="text-xs text-foreground">Share Files</span>
                </button>
              </li>
              <li>
                <button className="w-full flex flex-col items-center p-3 bg-card rounded-md border border-border hover:border-primary transition-colors">
                  <Book size={20} className="text-primary mb-1" />
                  <span className="text-xs text-foreground">Quiz</span>
                </button>
              </li>
              <li>
                <button className="w-full flex flex-col items-center p-3 bg-card rounded-md border border-border hover:border-primary transition-colors">
                  <Settings size={20} className="text-primary mb-1" />
                  <span className="text-xs text-foreground">Settings</span>
                </button>
              </li>
            </ul>
          </div>
          
          <div className="p-4">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Study Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground">Homework #3</span>
                  <span className="text-foreground">75%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground">Quiz Preparation</span>
                  <span className="text-foreground">40%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
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
