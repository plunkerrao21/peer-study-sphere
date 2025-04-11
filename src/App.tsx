
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Login from "./pages/Login";
import Navbar from "./components/layout/Navbar";

const App = () => (
  <ThemeProvider>
    <Toaster />
    <Sonner />
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <Login />
    </div>
  </ThemeProvider>
);

export default App;
