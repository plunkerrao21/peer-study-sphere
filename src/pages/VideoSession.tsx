
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Camera, CameraOff, Phone, MessageSquare, User, Users, Link, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

// Mock friends data - in a real app, this would come from your backend
const mockFriends = [
  { id: 1, name: 'Alex Johnson', username: 'alexj', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
  { id: 2, name: 'Sarah Williams', username: 'sarahw', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
  { id: 3, name: 'Michael Brown', username: 'mikeb', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80' },
  { id: 4, name: 'Emma Davis', username: 'emmad', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
  { id: 5, name: 'David Wilson', username: 'davidw', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
];

const VideoSession = () => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [inviteDialog, setInviteDialog] = useState(false);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'You', isSelf: true },
    { id: 2, name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' }
  ]);
  const [linkCopied, setLinkCopied] = useState(false);
  const navigate = useNavigate();

  const toggleMic = () => setMicEnabled(!micEnabled);
  const toggleCamera = () => setCameraEnabled(!cameraEnabled);
  const toggleChat = () => setChatOpen(!chatOpen);
  
  const endCall = () => {
    navigate('/sessions');
  };

  const sessionLink = "https://yourdomain.com/join-session/physics-123456";

  const copySessionLink = () => {
    navigator.clipboard.writeText(sessionLink);
    setLinkCopied(true);
    toast({
      title: "Link copied",
      description: "Session link copied to clipboard",
      duration: 3000,
    });
    setTimeout(() => setLinkCopied(false), 3000);
  };

  const inviteFriend = (friendId: number) => {
    const friend = mockFriends.find(f => f.id === friendId);
    if (friend) {
      // In a real app, this would send an invitation via your backend
      toast({
        title: "Invitation sent",
        description: `Invitation sent to ${friend.name}`,
        duration: 3000,
      });
      
      // For demo purposes, we'll add the friend to participants after a delay
      setTimeout(() => {
        if (!participants.some(p => p.id === friendId)) {
          setParticipants([...participants, { id: friendId, name: friend.name, avatar: friend.avatar }]);
        }
      }, 2000);
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white py-3 px-6 flex items-center justify-between">
        <div>
          <h1 className="font-semibold">Physics Study Session: Quantum Mechanics</h1>
          <p className="text-sm text-gray-400">Hosted by Alex Johnson • {participants.length} Participants</p>
        </div>
        <div className="flex items-center space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary" size="sm" className="flex items-center gap-2">
                <Users size={16} />
                Invite
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Invite Friends</DialogTitle>
              </DialogHeader>
              <div className="max-h-[60vh] overflow-auto py-4">
                <div className="grid gap-4">
                  {mockFriends.map(friend => (
                    <div key={friend.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{friend.name}</p>
                          <p className="text-sm text-gray-500">@{friend.username}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => inviteFriend(friend.id)}
                        disabled={participants.some(p => p.id === friend.id)}
                      >
                        {participants.some(p => p.id === friend.id) ? 'Joined' : 'Invite'}
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-500 mb-2">Or share this link to invite others:</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-2 bg-gray-100 rounded-md text-sm truncate">
                      {sessionLink}
                    </div>
                    <Button size="icon" variant="outline" onClick={copySessionLink}>
                      {linkCopied ? <Check size={18} /> : <Copy size={18} />}
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setInviteDialog(true)}>
            <Users size={20} />
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Grid */}
        <div className="flex-1 p-4 grid grid-cols-2 gap-4">
          {participants.map((participant) => (
            <div key={participant.id} className="bg-gray-800 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                {participant.isSelf && cameraEnabled ? (
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Video feed"
                    className="w-full h-full object-cover"
                  />
                ) : participant.avatar ? (
                  <img
                    src={participant.avatar}
                    alt={`${participant.name}'s video feed`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                    <User size={40} className="text-gray-500" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">
                    {participant.name}
                  </span>
                  {participant.isSelf && !micEnabled && <MicOff size={16} className="text-red-500" />}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Chat Sidebar */}
        {chatOpen && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700 text-white font-medium">
              Chat
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {[1, 2, 3, 4, 5].map((msg) => (
                <div key={msg} className="text-sm">
                  <p className="text-gray-400 font-medium mb-1">
                    {['You', 'Alex Johnson', 'Sarah Williams'][msg % 3]}
                  </p>
                  <p className="text-white">
                    {[
                      'Has anyone covered the homework from chapter 7?',
                      'Yes, I finished it yesterday.',
                      'I found problem #5 really challenging.',
                      'Let me explain how I approached it...',
                      'That makes sense, thanks for the explanation!'
                    ][msg - 1]}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-700">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full bg-gray-700 border-none rounded-md px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="bg-gray-800 py-4 flex items-center justify-center space-x-4">
        <button
          onClick={toggleMic}
          className={`p-3 rounded-full ${micEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'}`}
        >
          {micEnabled ? (
            <Mic size={20} className="text-white" />
          ) : (
            <MicOff size={20} className="text-white" />
          )}
        </button>
        
        <button
          onClick={toggleCamera}
          className={`p-3 rounded-full ${cameraEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'}`}
        >
          {cameraEnabled ? (
            <Camera size={20} className="text-white" />
          ) : (
            <CameraOff size={20} className="text-white" />
          )}
        </button>
        
        <button
          onClick={endCall}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full"
        >
          <Phone size={20} className="text-white transform rotate-135" />
        </button>
        
        <button
          onClick={toggleChat}
          className={`p-3 rounded-full ${chatOpen ? 'bg-primary' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          <MessageSquare size={20} className="text-white" />
        </button>
      </div>

      {/* Participants Dialog */}
      <Dialog open={inviteDialog} onOpenChange={setInviteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Session Participants</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-3">
              {participants.map(participant => (
                <div key={participant.id} className="flex items-center gap-3 p-2">
                  <Avatar>
                    {participant.avatar ? (
                      <AvatarImage src={participant.avatar} alt={participant.name} />
                    ) : (
                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {participant.name} {participant.isSelf && "(You)"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Share this link to invite more friends:</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-2 bg-muted rounded text-sm truncate">
                  {sessionLink}
                </div>
                <Button size="icon" variant="outline" onClick={copySessionLink}>
                  {linkCopied ? <Check size={18} /> : <Copy size={18} />}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoSession;
