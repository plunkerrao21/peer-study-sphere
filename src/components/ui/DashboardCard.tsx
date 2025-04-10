
import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  description, 
  icon, 
  to,
  color = 'bg-primary' 
}) => {
  return (
    <Link to={to} className="block">
      <div className="bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 h-full border border-border">
        <div className="mb-4">
          <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white`}>
            {icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default DashboardCard;
