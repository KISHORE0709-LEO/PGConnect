import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">PGConnect</h3>
            <p className="text-slate-300 mb-4">
              Finding the perfect accommodation for students made simple and hassle-free.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 text-slate-400 hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-slate-400 hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 text-slate-400 hover:text-primary cursor-pointer" />
              <Linkedin className="h-5 w-5 text-slate-400 hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* For Students */}
          <div>
            <h4 className="font-semibold mb-4">For Students</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-primary">How to Book</a></li>
              <li><a href="#" className="hover:text-primary">Safety Guidelines</a></li>
              <li><a href="#" className="hover:text-primary">FAQs</a></li>
              <li><a href="#" className="hover:text-primary">Student Insurance</a></li>
            </ul>
          </div>

          {/* For PG Owners */}
          <div>
            <h4 className="font-semibold mb-4">For PG Owners</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-primary">List Your Property</a></li>
              <li><a href="#" className="hover:text-primary">Owner Guidelines</a></li>
              <li><a href="#" className="hover:text-primary">Commission Structure</a></li>
              <li><a href="#" className="hover:text-primary">Success Stories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 text-center">
          <p className="text-slate-400">
            © 2025 PGConnect. All rights reserved. A student accommodation platform.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;