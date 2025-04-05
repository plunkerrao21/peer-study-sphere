
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import SessionCard from '../components/ui/SessionCard';

const PublicSessions = () => {
  const navigate = useNavigate();
  
  const handleJoinSession = () => {
    navigate('/video-session');
  };

  const sessions = [
    {
      id: 1,
      title: 'Physics Study Session: Quantum Mechanics',
      host: 'Alex Johnson',
      time: 'Live Now • Started 30m ago',
      participants: 4,
      isLive: true,
    },
    {
      id: 2,
      title: 'Calculus II: Integration Techniques',
      host: 'Sarah Williams',
      time: 'Live Now • Started 15m ago',
      participants: 6,
      isLive: true,
    },
    {
      id: 3,
      title: 'Introduction to Python Programming',
      host: 'Michael Brown',
      time: 'Today at 4:00 PM',
      participants: 2,
      isLive: false,
    },
    {
      id: 4,
      title: 'Organic Chemistry Review',
      host: 'Emma Davis',
      time: 'Today at 6:30 PM',
      participants: 0,
      isLive: false,
    },
    {
      id: 5,
      title: 'Literature Analysis: Shakespeare',
      host: 'Robert Wilson',
      time: 'Tomorrow at 2:00 PM',
      participants: 0,
      isLive: false,
    },
    {
      id: 6,
      title: 'Advanced Statistics: Hypothesis Testing',
      host: 'Jennifer Adams',
      time: 'Tomorrow at 5:00 PM',
      participants: 0,
      isLive: false,
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Study Sessions</h1>
          <p className="text-gray-600 mt-2">
            Join live study sessions or schedule your own.
          </p>
        </header>

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button className="btn btn-primary">
              Create Session
            </button>
            <button className="btn btn-outline">
              My Sessions
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <select className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Subjects</option>
              <option>Physics</option>
              <option>Mathematics</option>
              <option>Computer Science</option>
              <option>Chemistry</option>
              <option>Literature</option>
            </select>
            <select className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Sessions</option>
              <option>Live Now</option>
              <option>Upcoming</option>
            </select>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-5">Live Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {sessions.filter(session => session.isLive).map(session => (
              <SessionCard
                key={session.id}
                title={session.title}
                host={session.host}
                time={session.time}
                participants={session.participants}
                isLive={session.isLive}
                onJoin={handleJoinSession}
              />
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-5">Upcoming Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.filter(session => !session.isLive).map(session => (
              <SessionCard
                key={session.id}
                title={session.title}
                host={session.host}
                time={session.time}
                participants={session.participants}
                isLive={session.isLive}
                onJoin={handleJoinSession}
              />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default PublicSessions;
