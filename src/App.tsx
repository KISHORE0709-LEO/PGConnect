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

// Student Pages
import HowToBook from "./pages/HowToBook";
import SafetyGuidelines from "./pages/SafetyGuidelines";
import FAQs from "./pages/FAQs";
import StudentInsurance from "./pages/StudentInsurance";

// Owner Pages
import ListYourProperty from "./pages/ListYourProperty";
import OwnerGuidelines from "./pages/OwnerGuidelines";
import CommissionStructure from "./pages/CommissionStructure";
import SuccessStories from "./pages/SuccessStories";

// Support Pages
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";

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
            
            {/* Student Pages */}
            <Route path="/how-to-book" element={<HowToBook />} />
            <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/student-insurance" element={<StudentInsurance />} />
            
            {/* Owner Pages */}
            <Route path="/list-your-property" element={<ListYourProperty />} />
            <Route path="/owner-guidelines" element={<OwnerGuidelines />} />
            <Route path="/commission-structure" element={<CommissionStructure />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            
            {/* Support Pages */}
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;