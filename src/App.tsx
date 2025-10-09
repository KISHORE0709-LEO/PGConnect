import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import StudentDashboard from "./pages/StudentDashboard";
import PGDetails from "./pages/PGDetails";
import OwnerPGDashboard from "./pages/OwnerPGDashboard";
import RegisterPG from "./pages/RegisterPG";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/pg/:id" element={<PGDetails />} />
            <Route path="/owner/register-pg" element={<RegisterPG />} />
            <Route path="/owner/pg/:id" element={<OwnerPGDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;