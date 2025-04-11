
import React from 'react';

interface QuizCardProps {
  title: string;
  questionsCount: number;
  time: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  subject: string;
  onClick: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  questionsCount,
  time,
  difficulty,
  subject,
  onClick,
}) => {
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    Medium: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    Hard: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="card hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <span className={`text-xs font-medium px-2 py-1 rounded ${difficultyColor[difficulty]}`}>
        {difficulty}
      </span>
      <h3 className="text-lg font-semibold mt-3 mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-primary font-medium mb-3">{subject}</p>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{questionsCount} questions</span>
        <span>{time}</span>
      </div>
    </div>
  );
};

export default QuizCard;
