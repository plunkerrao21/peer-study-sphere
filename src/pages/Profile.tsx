
import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { User, FileText, Book, Video, Users, Edit, Mail, MapPin, Calendar } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('notes');

  // Sample user data
  const user = {
    name: 'Emma Johnson',
    role: 'Computer Science Student',
    location: 'Boston University',
    email: 'emma.johnson@example.com',
    joined: 'September 2023',
    bio: 'Computer Science student interested in AI, machine learning, and data structures. Looking to collaborate on programming projects and study groups.',
    stats: {
      quizzesCreated: 8,
      notesShared: 12,
      sessionsHosted: 5,
      studyGroups: 3,
    },
  };

  // Sample content for tabs
  const tabContent = {
    notes: [
      { id: 1, title: 'Data Structures & Algorithms', subject: 'Computer Science', downloads: 28, date: '2 weeks ago' },
      { id: 2, title: 'Machine Learning Fundamentals', subject: 'Computer Science', downloads: 42, date: '3 weeks ago' },
      { id: 3, title: 'Advanced JavaScript Concepts', subject: 'Web Development', downloads: 15, date: '1 month ago' },
    ],
    quizzes: [
      { id: 1, title: 'Python Programming Basics', subject: 'Computer Science', attempts: 56, date: '1 week ago' },
      { id: 2, title: 'Data Structures Quiz', subject: 'Computer Science', attempts: 38, date: '3 weeks ago' },
      { id: 3, title: 'Web Development Fundamentals', subject: 'Web Development', attempts: 27, date: '1 month ago' },
    ],
    sessions: [
      { id: 1, title: 'Algorithm Problem Solving', participants: 8, duration: '1h 30m', date: '2 days ago' },
      { id: 2, title: 'JavaScript Study Group', participants: 12, duration: '2h 15m', date: '1 week ago' },
      { id: 3, title: 'Database Design Workshop', participants: 6, duration: '1h 45m', date: '2 weeks ago' },
    ],
    groups: [
      { id: 1, name: 'CS301 Study Group', members: 15, lastActive: '2 hours ago' },
      { id: 2, name: 'Web Dev Enthusiasts', members: 28, lastActive: '1 day ago' },
      { id: 3, name: 'AI Research Club', members: 12, lastActive: '3 days ago' },
    ],
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={40} className="text-gray-500" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-md">
                    <Edit size={14} />
                  </button>
                </div>
                <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                <p className="text-gray-600 mb-4">{user.role}</p>
                
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <span className="bg-primary-50 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    Computer Science
                  </span>
                  <span className="bg-primary-50 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    Programming
                  </span>
                  <span className="bg-primary-50 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    Artificial Intelligence
                  </span>
                </div>
                
                <div className="w-full border-t pt-4 space-y-3">
                  <div className="flex items-center">
                    <Mail size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">{user.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Joined {user.joined}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t mt-6 pt-6">
                <h3 className="font-semibold mb-4">About</h3>
                <p className="text-gray-600 text-sm">{user.bio}</p>
              </div>

              <div className="border-t mt-6 pt-6">
                <h3 className="font-semibold mb-4">Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{user.stats.notesShared}</p>
                    <p className="text-xs text-gray-600">Notes Shared</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{user.stats.quizzesCreated}</p>
                    <p className="text-xs text-gray-600">Quizzes Created</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{user.stats.sessionsHosted}</p>
                    <p className="text-xs text-gray-600">Sessions Hosted</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{user.stats.studyGroups}</p>
                    <p className="text-xs text-gray-600">Study Groups</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <div className="border-b mb-6 pb-2">
                <div className="flex space-x-6">
                  <button
                    className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'notes'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('notes')}
                  >
                    <div className="flex items-center">
                      <FileText size={16} className="mr-2" />
                      Notes
                    </div>
                  </button>
                  <button
                    className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'quizzes'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('quizzes')}
                  >
                    <div className="flex items-center">
                      <Book size={16} className="mr-2" />
                      Quizzes
                    </div>
                  </button>
                  <button
                    className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'sessions'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('sessions')}
                  >
                    <div className="flex items-center">
                      <Video size={16} className="mr-2" />
                      Sessions
                    </div>
                  </button>
                  <button
                    className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'groups'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('groups')}
                  >
                    <div className="flex items-center">
                      <Users size={16} className="mr-2" />
                      Groups
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Notes Tab Content */}
              {activeTab === 'notes' && (
                <div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="text-left text-gray-500 text-sm">
                          <th className="pb-3 font-medium">Title</th>
                          <th className="pb-3 font-medium">Subject</th>
                          <th className="pb-3 font-medium">Downloads</th>
                          <th className="pb-3 font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {tabContent.notes.map((note) => (
                          <tr key={note.id} className="hover:bg-gray-50">
                            <td className="py-3 text-sm font-medium">{note.title}</td>
                            <td className="py-3 text-sm">{note.subject}</td>
                            <td className="py-3 text-sm">{note.downloads}</td>
                            <td className="py-3 text-sm text-gray-500">{note.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Quizzes Tab Content */}
              {activeTab === 'quizzes' && (
                <div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="text-left text-gray-500 text-sm">
                          <th className="pb-3 font-medium">Title</th>
                          <th className="pb-3 font-medium">Subject</th>
                          <th className="pb-3 font-medium">Attempts</th>
                          <th className="pb-3 font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {tabContent.quizzes.map((quiz) => (
                          <tr key={quiz.id} className="hover:bg-gray-50">
                            <td className="py-3 text-sm font-medium">{quiz.title}</td>
                            <td className="py-3 text-sm">{quiz.subject}</td>
                            <td className="py-3 text-sm">{quiz.attempts}</td>
                            <td className="py-3 text-sm text-gray-500">{quiz.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Sessions Tab Content */}
              {activeTab === 'sessions' && (
                <div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="text-left text-gray-500 text-sm">
                          <th className="pb-3 font-medium">Title</th>
                          <th className="pb-3 font-medium">Participants</th>
                          <th className="pb-3 font-medium">Duration</th>
                          <th className="pb-3 font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {tabContent.sessions.map((session) => (
                          <tr key={session.id} className="hover:bg-gray-50">
                            <td className="py-3 text-sm font-medium">{session.title}</td>
                            <td className="py-3 text-sm">{session.participants}</td>
                            <td className="py-3 text-sm">{session.duration}</td>
                            <td className="py-3 text-sm text-gray-500">{session.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Groups Tab Content */}
              {activeTab === 'groups' && (
                <div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="text-left text-gray-500 text-sm">
                          <th className="pb-3 font-medium">Name</th>
                          <th className="pb-3 font-medium">Members</th>
                          <th className="pb-3 font-medium">Last Active</th>
                          <th className="pb-3 font-medium"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {tabContent.groups.map((group) => (
                          <tr key={group.id} className="hover:bg-gray-50">
                            <td className="py-3 text-sm font-medium">{group.name}</td>
                            <td className="py-3 text-sm">{group.members}</td>
                            <td className="py-3 text-sm text-gray-500">{group.lastActive}</td>
                            <td className="py-3 text-sm">
                              <button className="text-primary hover:underline text-sm">Join</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
