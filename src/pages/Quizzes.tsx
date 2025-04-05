
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import QuizCard from '../components/ui/QuizCard';
import { Search, Plus } from 'lucide-react';

const Quizzes = () => {
  const navigate = useNavigate();
  
  const handleStartQuiz = () => {
    navigate('/quiz');
  };

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
    {
      id: 4,
      title: 'Organic Chemistry: Naming Compounds',
      questionsCount: 12,
      time: '15 mins',
      difficulty: 'Medium' as const,
      subject: 'Chemistry',
    },
    {
      id: 5,
      title: 'Shakespeare\'s Works and Themes',
      questionsCount: 10,
      time: '15 mins',
      difficulty: 'Medium' as const,
      subject: 'Literature',
    },
    {
      id: 6,
      title: 'Statistical Hypothesis Testing',
      questionsCount: 15,
      time: '20 mins',
      difficulty: 'Hard' as const,
      subject: 'Mathematics',
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quizzes</h1>
          <p className="text-gray-600 mt-2">
            Test your knowledge with interactive quizzes.
          </p>
        </header>

        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            <button className="btn btn-primary flex items-center">
              <Plus size={18} className="mr-2" />
              Create Quiz
            </button>
            <button className="btn btn-outline">
              My Quizzes
            </button>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search quizzes..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-5">Popular Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {quizzes.slice(0, 4).map((quiz) => (
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
          <h2 className="text-xl font-semibold mb-5">All Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {quizzes.map((quiz) => (
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
