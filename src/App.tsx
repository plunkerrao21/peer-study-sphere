
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import VideoSession from "./pages/VideoSession";
import PublicSessions from "./pages/PublicSessions";
import Notes from "./pages/Notes";
import Quiz from "./pages/Quiz";
import QuizResult from "./pages/QuizResult";
import Profile from "./pages/Profile";
import StudyGroup from "./pages/StudyGroup";
import Quizzes from "./pages/Quizzes";
import NotFound from "./pages/NotFound";

const App = () => (
  <ThemeProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/video-session" element={<VideoSession />} />
          <Route path="/sessions" element={<PublicSessions />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz-result" element={<QuizResult />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/groups" element={<StudyGroup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
