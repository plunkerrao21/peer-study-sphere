
import React from 'react';
import Navbar from './Navbar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-200">
      <Navbar />
      <main className="flex-1 p-6">{children}</main>
      <footer className="py-6 text-center text-muted-foreground text-sm border-t border-border">
        © {currentYear} PeerLearn. All rights reserved.
      </footer>
    </div>
  );
};

export default AppLayout;
