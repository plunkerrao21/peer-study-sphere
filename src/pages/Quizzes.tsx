
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import QuizCard from '../components/ui/QuizCard';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Quizzes = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  // Placeholder quizzes data
  const quizzes = [
    {
      id: 1,
      title: 'Quantum Mechanics Basics',
      questionsCount: 10,
      time: '15 mins',
      difficulty: 'Medium' as const,
      subject: 'Physics',
    },
    {
      id: 2,
      title: 'Calculus: Integration Techniques',
      questionsCount: 15,
      time: '20 mins',
      difficulty: 'Hard' as const,
      subject: 'Mathematics',
    },
    {
      id: 3,
      title: 'Python Programming Fundamentals',
      questionsCount: 20,
      time: '25 mins',
      difficulty: 'Easy' as const,
      subject: 'Computer Science',
    },
  ];
  
  // Filter quizzes based on search query
  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Quizzes</h1>
          <p className="text-muted-foreground mt-2">
            Test your knowledge with interactive quizzes.
          </p>
        </header>

        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            <Button variant="outline" className="hover:text-primary-foreground">
              My Quizzes
            </Button>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Search quizzes..."
              className="w-full pl-10 pr-4 bg-background text-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-5 text-foreground">Popular Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredQuizzes.slice(0, 4).map((quiz) => (
              <QuizCard
                key={quiz.id}
                title={quiz.title}
                questionsCount={quiz.questionsCount}
                time={quiz.time}
                difficulty={quiz.difficulty}
                subject={quiz.subject}
                onClick={handleStartQuiz}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-5 text-foreground">All Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                title={quiz.title}
                questionsCount={quiz.questionsCount}
                time={quiz.time}
                difficulty={quiz.difficulty}
                subject={quiz.subject}
                onClick={handleStartQuiz}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Quizzes;
