
import React from 'react';
import Navbar from './Navbar';
import { ThemeToggle } from '../theme/ThemeToggle';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-200">
      <Navbar />
      <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
      </div>
      <main className="flex-1 p-6">{children}</main>
      <footer className="py-6 text-center text-muted-foreground text-sm border-t border-border">
        © {currentYear} PeerLearn. All rights reserved.
      </footer>
    </div>
  );
};

export default AppLayout;
