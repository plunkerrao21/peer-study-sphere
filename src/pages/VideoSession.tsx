
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Camera, CameraOff, Phone, MessageSquare, User, Users } from 'lucide-react';

const VideoSession = () => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMic = () => setMicEnabled(!micEnabled);
  const toggleCamera = () => setCameraEnabled(!cameraEnabled);
  const toggleChat = () => setChatOpen(!chatOpen);
  
  const endCall = () => {
    navigate('/sessions');
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white py-3 px-6 flex items-center justify-between">
        <div>
          <h1 className="font-semibold">Physics Study Session: Quantum Mechanics</h1>
          <p className="text-sm text-gray-400">Hosted by Alex Johnson • 4 Participants</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-3 py-1 bg-primary-700 rounded-md text-sm">
            Invite
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <Users size={20} />
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Grid */}
        <div className="flex-1 p-4 grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-gray-800 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                {item === 1 && cameraEnabled ? (
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Video feed"
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
                    {item === 1 ? 'You' : ['Alex Johnson', 'Sarah Williams', 'Michael Brown'][item - 2]}
                  </span>
                  {item === 1 && !micEnabled && <MicOff size={16} className="text-red-500" />}
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
    </div>
  );
};

export default VideoSession;
