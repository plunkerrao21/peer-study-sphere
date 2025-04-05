
import React from 'react';
import { Clock } from 'lucide-react';

interface SessionCardProps {
  title: string;
  host: string;
  time: string;
  participants: number;
  isLive?: boolean;
  onJoin: () => void;
}

const SessionCard: React.FC<SessionCardProps> = ({
  title,
  host,
  time,
  participants,
  isLive = false,
  onJoin,
}) => {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600">Hosted by {host}</p>
        </div>
        {isLive && (
          <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>
            LIVE
          </span>
        )}
      </div>
      <div className="flex items-center text-gray-500 mb-4">
        <Clock size={16} className="mr-2" />
        <span className="text-sm">{time}</span>
        <span className="mx-2">•</span>
        <span className="text-sm">{participants} participants</span>
      </div>
      <button
        onClick={onJoin}
        className="btn btn-primary w-full"
      >
        {isLive ? 'Join Now' : 'Join Session'}
      </button>
    </div>
  );
};

export default SessionCard;
