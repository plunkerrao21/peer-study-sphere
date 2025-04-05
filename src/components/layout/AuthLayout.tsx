
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-primary-100 to-primary-50">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-700 p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-6">PeerLearn</h1>
          <p className="text-primary-200 text-lg">Connect, Learn, and Grow Together</p>
        </div>
        <div className="space-y-6">
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <p className="text-white font-medium">
              "PeerLearn has transformed how I study. The collaborative tools make learning so much more engaging!"
            </p>
            <p className="text-primary-200 mt-4">— Alex Johnson, Computer Science Student</p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
