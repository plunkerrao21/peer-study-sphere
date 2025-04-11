
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-primary-100/80 to-primary-50/80 dark:from-primary-900 dark:to-primary-800/70">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-700 dark:from-primary-800 dark:to-primary-900 p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-6">PeerLearn</h1>
          <p className="text-primary-200 text-lg dark:text-primary-200">Connect, Learn, and Grow Together</p>
        </div>
        <div className="space-y-6">
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <p className="text-white font-medium">
              "PeerLearn has transformed how I study. The collaborative tools make learning so much more engaging!"
            </p>
            <p className="text-primary-200 mt-4 dark:text-primary-300">— Alex Johnson, Computer Science Student</p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-2">{title}</h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
