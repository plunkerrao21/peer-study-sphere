
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Camera, CameraOff, Phone, MessageSquare, User, Users, Link, Copy, Check, Video, X, MonitorSmartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

// Mock data - in a real app, this would come from an API
const mockFriends = [
  { id: 1, name: 'Alex Johnson', username: 'alexj', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
  { id: 2, name: 'Sarah Williams', username: 'sarahw', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
];

const VideoSession = () => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [inviteDialog, setInviteDialog] = useState(false);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'You', isSelf: true },
  ]);
  const [linkCopied, setLinkCopied] = useState(false);
  const navigate = useNavigate();
  
  // Screen recording states
  const [recordingDialog, setRecordingDialog] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState<'screen' | 'camera' | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<BlobPart[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<number | null>(null);
  
  // End session confirmation
  const [endSessionDialog, setEndSessionDialog] = useState(false);

  const toggleMic = () => setMicEnabled(!micEnabled);
  const toggleCamera = () => setCameraEnabled(!cameraEnabled);
  const toggleChat = () => setChatOpen(!chatOpen);
  
  const endCall = () => {
    setEndSessionDialog(true);
  };
  
  const confirmEndCall = () => {
    if (isRecording) {
      stopRecording();
    }
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
  
  // Screen recording functionality
  const startRecording = async (type: 'screen' | 'camera') => {
    try {
      let stream: MediaStream;
      
      if (type === 'screen') {
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: { cursor: 'always' },
          audio: true
        });
      } else {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
      }
      
      // Set up recording
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(recordedBlob);
        
        // In a real app, you might want to save this video to a server
        // For now, we'll just download it
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `recording-${new Date().toISOString()}.webm`;
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
        
        recordedChunksRef.current = [];
        setIsRecording(false);
        setRecordingType(null);
        
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setRecordingTime(0);
        
        toast({
          title: "Recording saved",
          description: "Your recording has been saved to your downloads",
          duration: 3000,
        });
      };
      
      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingType(type);
      
      // Start timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      // Set up listener for stream ending (user clicks "Stop sharing")
      stream.getVideoTracks()[0].onended = () => {
        stopRecording();
      };
      
      setRecordingDialog(false);
      
      toast({
        title: `${type === 'screen' ? 'Screen' : 'Camera'} recording started`,
        description: "Click the stop button when you're done",
        duration: 3000,
      });
      
    } catch (err) {
      console.error("Error starting recording:", err);
      toast({
        title: "Recording failed",
        description: "Failed to start recording. Please check permissions.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      // Stop all tracks in the stream
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };
  
  // Format recording time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card text-foreground py-3 px-6 flex items-center justify-between border-b border-border">
        <div>
          <h1 className="font-semibold">Physics Study Session: Quantum Mechanics</h1>
          <p className="text-sm text-muted-foreground">Hosted by Alex Johnson • {participants.length} Participants</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="default" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => setRecordingDialog(true)}
          >
            <Video size={16} />
            Record
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
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
                    <div key={friend.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{friend.name}</p>
                          <p className="text-sm text-muted-foreground">@{friend.username}</p>
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
                
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Or share this link to invite others:</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-2 bg-muted rounded-md text-sm truncate text-foreground">
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
      </div>
      
      {/* Recording indicator */}
      {isRecording && (
        <div className="screen-recording-control">
          <div className="recording-indicator"></div>
          <span className="text-sm text-red-500 font-medium mr-2">REC {formatTime(recordingTime)}</span>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={stopRecording}
            className="h-7 px-2"
          >
            <X size={16} className="text-red-500" />
          </Button>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Grid */}
        <div className="flex-1 p-4 grid grid-cols-2 gap-4">
          {participants.map((participant) => (
            <div key={participant.id} className="bg-muted rounded-lg overflow-hidden relative">
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
                  <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center">
                    <User size={40} className="text-muted-foreground" />
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
          <div className="w-80 bg-card border-l border-border flex flex-col">
            <div className="p-4 border-b border-border text-foreground font-medium">
              Chat
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-center text-muted-foreground py-8">
                <MessageSquare size={40} className="mx-auto mb-2 opacity-20" />
                <p>No messages yet</p>
                <p className="text-sm">Start the conversation</p>
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <Input
                type="text"
                placeholder="Type a message..."
                className="w-full bg-background text-foreground"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="bg-card py-4 flex items-center justify-center space-x-4 border-t border-border">
        <button
          onClick={toggleMic}
          className={`p-3 rounded-full ${micEnabled ? 'bg-muted hover:bg-muted/80' : 'bg-red-500 hover:bg-red-600'}`}
        >
          {micEnabled ? (
            <Mic size={20} className="text-foreground" />
          ) : (
            <MicOff size={20} className="text-white" />
          )}
        </button>
        
        <button
          onClick={toggleCamera}
          className={`p-3 rounded-full ${cameraEnabled ? 'bg-muted hover:bg-muted/80' : 'bg-red-500 hover:bg-red-600'}`}
        >
          {cameraEnabled ? (
            <Camera size={20} className="text-foreground" />
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
          className={`p-3 rounded-full ${chatOpen ? 'bg-primary' : 'bg-muted hover:bg-muted/80'}`}
        >
          <MessageSquare size={20} className={chatOpen ? "text-primary-foreground" : "text-foreground"} />
        </button>
      </div>

      {/* Record Session Dialog */}
      <Dialog open={recordingDialog} onOpenChange={setRecordingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Record Session</DialogTitle>
            <DialogDescription>
              Choose what you want to record
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              onClick={() => startRecording('screen')}
              className="flex flex-col items-center p-6 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <MonitorSmartphone size={40} className="mb-2 text-primary" />
              <span className="font-medium text-foreground">Screen + Audio</span>
              <span className="text-xs text-muted-foreground mt-1">Record your screen with audio</span>
            </button>
            
            <button
              onClick={() => startRecording('camera')}
              className="flex flex-col items-center p-6 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <Video size={40} className="mb-2 text-primary" />
              <span className="font-medium text-foreground">Camera + Audio</span>
              <span className="text-xs text-muted-foreground mt-1">Record your webcam with audio</span>
            </button>
          </div>
          <DialogFooter className="flex justify-between mt-4 gap-2">
            <Button variant="outline" onClick={() => setRecordingDialog(false)}>Cancel</Button>
            <div className="text-xs text-muted-foreground">
              Recordings will be saved to your downloads
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* End Session Confirmation Dialog */}
      <Dialog open={endSessionDialog} onOpenChange={setEndSessionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>End Session</DialogTitle>
            <DialogDescription>
              Are you sure you want to end this session?
              {isRecording && (
                <div className="mt-2 p-2 bg-destructive/10 border border-destructive rounded text-sm text-destructive">
                  Note: Your recording will be saved before ending the session.
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => setEndSessionDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmEndCall}>End Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoSession;
