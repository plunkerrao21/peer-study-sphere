
import React from 'react';
import { CheckCircle, XCircle, UserCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface FriendRequestNotificationProps {
  id: number;
  name: string;
  username: string;
  avatar?: string;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}

const FriendRequestNotification: React.FC<FriendRequestNotificationProps> = ({
  id,
  name,
  username,
  avatar,
  onAccept,
  onReject
}) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-gray-500">@{username}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onAccept(id)}
            className="p-1.5 text-green-500 hover:bg-green-50 rounded-full transition-colors"
            title="Accept request"
          >
            <CheckCircle size={20} />
          </button>
          <button
            onClick={() => onReject(id)}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Reject request"
          >
            <XCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestNotification;
