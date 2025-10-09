import { Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-teal-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">PGConnect</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Finding the perfect accommodation for students made simple and hassle-free.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 text-white hover:text-pink-400 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-white hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-white hover:text-sky-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* For Students Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">For Students</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How to Book</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Student Insurance</a></li>
            </ul>
          </div>

          {/* For PG Owners Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">For PG Owners</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">List Your Property</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Owner Guidelines</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Commission Structure</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 PGConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;