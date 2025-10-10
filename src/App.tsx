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
import Profile from "./pages/Profile";

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
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={
            <>
              <Navbar />
              <div className="flex-1"><Index /></div>
              <Footer />
            </>
          } />
          <Route path="/auth" element={
            <>
              <Navbar />
              <div className="flex-1"><Auth /></div>
              <Footer />
            </>
          } />
          <Route path="/student-dashboard" element={
            <>
              <Navbar />
              <div className="flex-1"><StudentDashboard /></div>
              <Footer />
            </>
          } />
          <Route path="/owner-dashboard" element={
            <>
              <Navbar />
              <div className="flex-1"><OwnerPGDashboard /></div>
              <Footer />
            </>
          } />
          <Route path="/student" element={
            <>
              <Navbar />
              <div className="flex-1"><StudentDashboard /></div>
              <Footer />
            </>
          } />
          <Route path="/student/pg/:id" element={
            <>
              <Navbar />
              <div className="flex-1"><PGDetails /></div>
              <Footer />
            </>
          } />
          <Route path="/owner/register-pg" element={
            <>
              <Navbar />
              <div className="flex-1"><RegisterPG /></div>
              <Footer />
            </>
          } />
          <Route path="/owner/pg/:id" element={
            <>
              <Navbar />
              <div className="flex-1"><OwnerPGDashboard /></div>
              <Footer />
            </>
          } />
          <Route path="/how-to-book" element={
            <>
              <Navbar />
              <div className="flex-1"><HowToBook /></div>
              <Footer />
            </>
          } />
          <Route path="/safety-guidelines" element={
            <>
              <Navbar />
              <div className="flex-1"><SafetyGuidelines /></div>
              <Footer />
            </>
          } />
          <Route path="/faqs" element={
            <>
              <Navbar />
              <div className="flex-1"><FAQs /></div>
              <Footer />
            </>
          } />
          <Route path="/student-insurance" element={
            <>
              <Navbar />
              <div className="flex-1"><StudentInsurance /></div>
              <Footer />
            </>
          } />
          <Route path="/list-your-property" element={
            <>
              <Navbar />
              <div className="flex-1"><ListYourProperty /></div>
              <Footer />
            </>
          } />
          <Route path="/owner-guidelines" element={
            <>
              <Navbar />
              <div className="flex-1"><OwnerGuidelines /></div>
              <Footer />
            </>
          } />
          <Route path="/commission-structure" element={
            <>
              <Navbar />
              <div className="flex-1"><CommissionStructure /></div>
              <Footer />
            </>
          } />
          <Route path="/success-stories" element={
            <>
              <Navbar />
              <div className="flex-1"><SuccessStories /></div>
              <Footer />
            </>
          } />
          <Route path="/contact-us" element={
            <>
              <Navbar />
              <div className="flex-1"><ContactUs /></div>
              <Footer />
            </>
          } />
          <Route path="/privacy-policy" element={
            <>
              <Navbar />
              <div className="flex-1"><PrivacyPolicy /></div>
              <Footer />
            </>
          } />
          <Route path="/terms-of-service" element={
            <>
              <Navbar />
              <div className="flex-1"><TermsOfService /></div>
              <Footer />
            </>
          } />
          <Route path="/refund-policy" element={
            <>
              <Navbar />
              <div className="flex-1"><RefundPolicy /></div>
              <Footer />
            </>
          } />
          <Route path="*" element={
            <>
              <Navbar />
              <div className="flex-1"><NotFound /></div>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;