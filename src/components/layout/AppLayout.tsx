
import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-200">
      {/* Content area */}
      <main className="flex-1 p-6">{children}</main>
      
      {/* Simple footer */}
      <footer className="py-6 text-center text-muted-foreground text-sm border-t border-border">
        © {new Date().getFullYear()} PeerLearn. All rights reserved.
      </footer>
    </div>
  );
};

export default AppLayout;
