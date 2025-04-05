
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    <Card className="mb-3">
      <CardContent className="p-4">
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
            <Button 
              onClick={() => onAccept(id)} 
              size="icon" 
              variant="ghost" 
              className="text-green-500 hover:bg-green-50 hover:text-green-600"
              title="Accept request"
            >
              <CheckCircle size={20} />
            </Button>
            <Button 
              onClick={() => onReject(id)} 
              size="icon" 
              variant="ghost" 
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
              title="Reject request"
            >
              <XCircle size={20} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FriendRequestNotification;
