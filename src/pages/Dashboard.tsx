
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import DashboardCard from '../components/ui/DashboardCard';
import { MessageSquare, Book, FileText, Video, Users } from 'lucide-react';

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Emma!</h1>
          <p className="text-gray-600 mt-2">
            Continue your learning journey with these tools and resources.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-5">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <DashboardCard
              title="Chat"
              description="Connect with peers and discuss your studies"
              icon={<MessageSquare size={20} />}
              to="/chat"
              color="bg-primary"
            />
            <DashboardCard
              title="Notes"
              description="Access and share study materials"
              icon={<FileText size={20} />}
              to="/notes"
              color="bg-indigo-500"
            />
            <DashboardCard
              title="Quizzes"
              description="Test your knowledge and practice"
              icon={<Book size={20} />}
              to="/quizzes"
              color="bg-blue-500"
            />
            <DashboardCard
              title="Study Sessions"
              description="Join live video study sessions"
              icon={<Video size={20} />}
              to="/sessions"
              color="bg-green-500"
            />
            <DashboardCard
              title="Study Groups"
              description="Collaborate with your study groups"
              icon={<Users size={20} />}
              to="/groups"
              color="bg-purple-500"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-5">Upcoming Sessions</h2>
            <div className="card">
              <div className="divide-y">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Advanced Calculus Study Group</h3>
                        <p className="text-sm text-gray-500">Today, 3:00 PM - 4:30 PM</p>
                      </div>
                      <button className="btn btn-primary text-sm">
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-5">Recent Activity</h2>
            <div className="card">
              <div className="divide-y">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="py-3 first:pt-0 last:pb-0">
                    <p className="text-sm font-medium">Physics Notes updated</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
