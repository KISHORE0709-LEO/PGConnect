import { Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">PGConnect</h3>
            <p className="text-white text-sm leading-relaxed">
              Finding the perfect accommodation for students made simple and hassle-free.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/pgconnect" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 text-white hover:text-pink-400 cursor-pointer transition-colors" />
              </a>
              <a href="https://linkedin.com/company/pgconnect" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-white hover:text-blue-400 cursor-pointer transition-colors" />
              </a>
              <a href="https://twitter.com/pgconnect" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-white hover:text-sky-400 cursor-pointer transition-colors" />
              </a>
            </div>
          </div>

          {/* For Students Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">For Students</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/how-to-book" className="text-white hover:text-gray-200 transition-colors">How to Book</Link></li>
              <li><Link to="/safety-guidelines" className="text-white hover:text-gray-200 transition-colors">Safety Guidelines</Link></li>
              <li><Link to="/faqs" className="text-white hover:text-gray-200 transition-colors">FAQs</Link></li>
              <li><Link to="/student-insurance" className="text-white hover:text-gray-200 transition-colors">Student Insurance</Link></li>
            </ul>
          </div>

          {/* For PG Owners Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">For PG Owners</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/list-your-property" className="text-white hover:text-gray-200 transition-colors">List Your Property</Link></li>
              <li><Link to="/owner-guidelines" className="text-white hover:text-gray-200 transition-colors">Owner Guidelines</Link></li>
              <li><Link to="/commission-structure" className="text-white hover:text-gray-200 transition-colors">Commission Structure</Link></li>
              <li><Link to="/success-stories" className="text-white hover:text-gray-200 transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact-us" className="text-white hover:text-gray-200 transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="text-white hover:text-gray-200 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-white hover:text-gray-200 transition-colors">Terms of Service</Link></li>
              <li><Link to="/refund-policy" className="text-white hover:text-gray-200 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-white text-sm">
            © 2025 PGConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;