import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import StudentDashboard from "./pages/StudentDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import PGDetails from "./pages/PGDetails";
import OwnerPGDashboard from "./pages/OwnerPGDashboard";
import RegisterPG from "./pages/RegisterPG";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/pg/:id" element={<PGDetails />} />
              <Route path="/owner" element={<OwnerDashboard />} />
              <Route path="/owner/register-pg" element={<RegisterPG />} />
              <Route path="/owner/pg/:id" element={<OwnerPGDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
