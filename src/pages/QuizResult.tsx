
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

const QuizResult = () => {
  const navigate = useNavigate();

  // Sample results data
  const results = {
    title: 'Quantum Mechanics Basics',
    subject: 'Physics',
    score: 4,
    totalQuestions: 5,
    percentage: 80,
    timeSpent: '13m 24s',
    questions: [
      {
        id: 1,
        text: 'Which equation represents the Schrödinger equation for a particle in one dimension?',
        userAnswer: 0, // index of the answer they selected
        correctAnswer: 0,
        isCorrect: true,
        options: [
          'iℏ∂Ψ/∂t = -(ℏ²/2m)∂²Ψ/∂x² + V(x)Ψ',
          'E = mc²',
          'F = ma',
          'PV = nRT'
        ],
        explanation: 'The Schrödinger equation describes how the quantum state of a physical system changes over time.',
      },
      {
        id: 2,
        text: 'What does the wave function Ψ represent in quantum mechanics?',
        userAnswer: 2,
        correctAnswer: 2,
        isCorrect: true,
        options: [
          'The exact position of a particle',
          'The exact momentum of a particle',
          'The probability amplitude of finding a particle at a certain position',
          'The energy of a particle'
        ],
        explanation: 'The wave function gives us the probability amplitude. The square of its absolute value gives the probability density.',
      },
      {
        id: 3,
        text: 'What is the Heisenberg Uncertainty Principle?',
        userAnswer: 0,
        correctAnswer: 2,
        isCorrect: false,
        options: [
          'It states that energy is always conserved',
          'It states that momentum is always conserved',
          'It states that the product of position and momentum uncertainties cannot be less than ℏ/2',
          'It states that the energy and time uncertainties cannot be less than ℏ/2'
        ],
        explanation: 'The uncertainty principle states that there is a fundamental limit to the precision with which complementary variables can be measured.',
      },
      {
        id: 4,
        text: 'What phenomenon demonstrates the wave-particle duality of light?',
        userAnswer: 3,
        correctAnswer: 3,
        isCorrect: true,
        options: [
          'Photoelectric effect',
          'Double-slit experiment',
          'Compton scattering',
          'All of the above'
        ],
        explanation: 'All three phenomena provide evidence for the dual nature of light, demonstrating both wave-like and particle-like behaviors.',
      },
      {
        id: 5,
        text: 'What is the probability of finding a particle in a region defined by the wave function Ψ?',
        userAnswer: 2,
        correctAnswer: 2,
        isCorrect: true,
        options: [
          'Ψ',
          'Ψ²',
          '|Ψ|²',
          '|Ψ|'
        ],
        explanation: 'The probability density is given by the square of the modulus of the wave function, |Ψ|².',
      },
    ],
  };

  const getLetterGrade = (percentage: number) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const letterGrade = getLetterGrade(results.percentage);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto pt-10 px-6">
        <div className="card mb-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Quiz Results</h1>
            <p className="text-gray-600">{results.title} - {results.subject}</p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
            <div className="w-32 h-32 rounded-full border-4 border-primary flex items-center justify-center">
              <div className="text-center">
                <span className="block text-3xl font-bold">{results.percentage}%</span>
                <span className="text-sm text-gray-600">Score</span>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-2 gap-x-16 gap-y-2">
                <div>
                  <p className="text-gray-600">Questions:</p>
                  <p className="font-semibold">{results.totalQuestions}</p>
                </div>
                <div>
                  <p className="text-gray-600">Correct:</p>
                  <p className="font-semibold">{results.score}</p>
                </div>
                <div>
                  <p className="text-gray-600">Time Spent:</p>
                  <p className="font-semibold">{results.timeSpent}</p>
                </div>
                <div>
                  <p className="text-gray-600">Grade:</p>
                  <p className="font-semibold">{letterGrade}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button 
              className="btn btn-outline"
              onClick={() => navigate('/quizzes')}
            >
              Back to Quizzes
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/quiz')}
            >
              Retake Quiz
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Question Review</h2>
          
          <div className="space-y-8">
            {results.questions.map((question, index) => (
              <div key={question.id} className="pb-6 border-b last:border-0 last:pb-0">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    {question.isCorrect ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <XCircle className="text-red-500" size={20} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium mb-3">
                      {index + 1}. {question.text}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      {question.options.map((option, optionIndex) => (
                        <div 
                          key={optionIndex}
                          className={`py-2 px-3 rounded-md text-sm ${
                            optionIndex === question.correctAnswer
                              ? 'bg-green-100 text-green-800'
                              : optionIndex === question.userAnswer && !question.isCorrect
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {option}
                          {optionIndex === question.userAnswer && ' (Your Answer)'}
                          {optionIndex === question.correctAnswer && ' (Correct Answer)'}
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-primary-50 p-3 rounded-md text-sm">
                      <p className="font-medium text-primary mb-1">Explanation:</p>
                      <p className="text-gray-700">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
