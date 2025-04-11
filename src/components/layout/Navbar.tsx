
import React from 'react';
import { LogOut, User, Bell } from 'lucide-react';
import { ThemeToggle } from '../theme/ThemeToggle';

const Navbar = () => {
  return (
    <nav className="w-full bg-card dark:bg-card border-b border-border px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">P</span>
          </div>
          <span className="text-xl font-bold text-primary">PeerLearn</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-1">
          <a href="#" className="nav-link">Dashboard</a>
          <a href="#" className="nav-link">Chat</a>
          <a href="#" className="nav-link">Sessions</a>
          <a href="#" className="nav-link">Notes</a>
          <a href="#" className="nav-link">Quizzes</a>
          <a href="#" className="nav-link">Study Groups</a>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button className="p-2 rounded-full hover:bg-muted transition-colors">
          <Bell size={20} className="text-foreground" />
        </button>
        <button className="p-2 rounded-full hover:bg-muted transition-colors">
          <User size={20} className="text-foreground" />
        </button>
        <button className="p-2 rounded-full hover:bg-muted transition-colors">
          <LogOut size={20} className="text-foreground" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
