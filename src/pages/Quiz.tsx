
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const navigate = useNavigate();

  // Sample quiz data
  const quiz = {
    title: 'Quantum Mechanics Basics',
    subject: 'Physics',
    timeLimit: '15 minutes',
    questions: [
      {
        id: 1,
        text: 'Which equation represents the Schrödinger equation for a particle in one dimension?',
        options: [
          'iℏ∂Ψ/∂t = -(ℏ²/2m)∂²Ψ/∂x² + V(x)Ψ',
          'E = mc²',
          'F = ma',
          'PV = nRT'
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        text: 'What does the wave function Ψ represent in quantum mechanics?',
        options: [
          'The exact position of a particle',
          'The exact momentum of a particle',
          'The probability amplitude of finding a particle at a certain position',
          'The energy of a particle'
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What is the Heisenberg Uncertainty Principle?',
        options: [
          'It states that energy is always conserved',
          'It states that momentum is always conserved',
          'It states that the product of position and momentum uncertainties cannot be less than ℏ/2',
          'It states that the energy and time uncertainties cannot be less than ℏ/2'
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What phenomenon demonstrates the wave-particle duality of light?',
        options: [
          'Photoelectric effect',
          'Double-slit experiment',
          'Compton scattering',
          'All of the above'
        ],
        correctAnswer: 3,
      },
      {
        id: 5,
        text: 'What is the probability of finding a particle in a region defined by the wave function Ψ?',
        options: [
          'Ψ',
          'Ψ²',
          '|Ψ|²',
          '|Ψ|'
        ],
        correctAnswer: 2,
      },
    ],
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
    }
  };

  const handleSubmit = () => {
    navigate('/quiz-result');
  };

  const question = quiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Quiz Header */}
      <div className="bg-card text-foreground border-b border-border p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">{quiz.title}</h1>
          <p className="text-sm text-muted-foreground">{quiz.subject}</p>
        </div>
        <div className="flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 text-primary px-3 py-1 rounded-full">
          <Clock size={16} />
          <span className="font-medium">12:45</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted h-1">
        <div
          className="bg-primary h-1"
          style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Quiz Content */}
      <div className="flex-1 max-w-3xl mx-auto w-full p-8 py-12">
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-2">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </p>
          <h2 className="text-2xl font-semibold mb-8 text-foreground">{question.text}</h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedAnswer === index
                    ? 'border-primary bg-primary/10 dark:bg-primary/20'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      selectedAnswer === index
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground'
                    }`}
                  >
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    )}
                  </div>
                  <span className="text-foreground">{option}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            variant={currentQuestion === 0 ? "outline" : "default"}
            className={currentQuestion === 0 ? 
              "text-muted-foreground bg-muted cursor-not-allowed" : 
              "hover:text-primary-foreground"
            }
          >
            Previous
          </Button>
          
          {currentQuestion < quiz.questions.length - 1 ? (
            <Button onClick={handleNextQuestion} variant="default">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} variant="default">
              Submit Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
