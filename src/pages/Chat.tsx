import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { Send, Search, User, UserPlus, Link as LinkIcon, X, CheckCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

interface UserSearchResult {
  id: number;
  name: string;
  username: string;
  avatar?: string;
  isFriend: boolean;
}

const Chat = () => {
  const [message, setMessage] = useState('');
  const [activeContact, setActiveContact] = useState<number>(1);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [friendLinkDialogOpen, setFriendLinkDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const [friendLink, setFriendLink] = useState('');
  const { toast } = useToast();

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
  
  const handleSearch = () => {
    if (searchQuery.trim().length < 3) {
      toast({
        title: "Search query too short",
        description: "Please enter at least 3 characters",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would be an API call
    // For now, we'll simulate search results
    const mockResults: UserSearchResult[] = [
      { id: 101, name: 'Emily Parker', username: 'em_parker', isFriend: false },
      { id: 102, name: 'James Wilson', username: 'jwilson', isFriend: true },
      { id: 103, name: 'David Thompson', username: 'davidt', isFriend: false },
    ].filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(mockResults);
  };
  
  const generateFriendLink = () => {
    // In a real app, this would generate a unique link with the user's ID
    const uniqueCode = Math.random().toString(36).substring(2, 10);
    const link = `${window.location.origin}/add-friend/${uniqueCode}`;
    setFriendLink(link);
  };
  
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(friendLink).then(() => {
      toast({
        title: "Link copied!",
        description: "Friend link copied to clipboard",
      });
    }).catch(() => {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive"
      });
    });
  };
  
  const handleAddFriend = (user: UserSearchResult) => {
    // In a real app, this would make an API call to add the friend
    toast({
      title: "Friend request sent!",
      description: `Request sent to ${user.name}`,
    });
    
    // Update the search results to show the user as a friend (in a real app this would happen after the API confirms)
    setSearchResults(prevResults => 
      prevResults.map(result => 
        result.id === user.id ? { ...result, isFriend: true } : result
      )
    );
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-5rem)] flex border rounded-lg overflow-hidden bg-white">
        {/* Contacts Sidebar */}
        <div className="w-80 border-r flex flex-col bg-gray-50">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="text-lg font-semibold">Messages</div>
            <Button 
              onClick={() => setSearchDialogOpen(true)}
              size="icon"
              variant="default"
              className="rounded-full"
              title="Manage friends"
            >
              <UserPlus size={18} />
            </Button>
          </div>
          
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search messages or contacts"
                className="w-full pl-10 pr-4"
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
      
      {/* Search Friends Dialog */}
      <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Find Friends</DialogTitle>
            <DialogDescription>
              Search for friends by name or username
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center space-x-2 mt-4">
            <div className="grid flex-1 gap-2">
              <Input
                type="text"
                placeholder="Search by name or username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleSearch}
              variant="default"
            >
              Search
            </Button>
          </div>
          
          <div className="mt-4 max-h-[300px] overflow-y-auto">
            {searchResults.length > 0 ? (
              <div className="grid gap-3">
                {searchResults.map(user => (
                  <Card key={user.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">@{user.username}</div>
                          </div>
                        </div>
                        {user.isFriend ? (
                          <Button variant="ghost" className="text-green-500" disabled>
                            <CheckCheck size={18} className="mr-1" />
                            <span>Friend</span>
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => handleAddFriend(user)}
                            variant="outline"
                            className="text-primary"
                          >
                            <UserPlus size={18} className="mr-1" />
                            <span>Add</span>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-center py-6 text-gray-500">
                No users found matching "{searchQuery}"
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Search for users to see results
              </div>
            )}
          </div>
          
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex flex-col">
                <div className="font-medium mb-2">Share Friend Link</div>
                <p className="text-sm text-gray-500 mb-4">
                  Share this link with friends to add you on PeerLearn
                </p>
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={generateFriendLink}
                    variant="outline"
                    className="flex-1"
                  >
                    <LinkIcon size={18} className="mr-2" />
                    Generate Link
                  </Button>
                  {friendLink && (
                    <Button 
                      onClick={copyLinkToClipboard}
                      variant="default"
                    >
                      Copy
                    </Button>
                  )}
                </div>
                {friendLink && (
                  <Input
                    readOnly
                    value={friendLink}
                    className="mt-3"
                  />
                )}
              </div>
            </CardContent>
          </Card>
          
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setSearchDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Chat;
