import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleRegister = () => {
    navigate("/auth");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-white hover:text-white/80 transition-colors">
              PGConnect
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleLogin}
                  className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 bg-transparent"
                >
                  Login
                </Button>
                <Button
                  onClick={handleRegister}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white hover:bg-white/20"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && !isAuthenticated && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/80 backdrop-blur-md rounded-lg mt-2 shadow-lg">
              <Button
                variant="outline"
                onClick={handleLogin}
                className="w-full justify-center border-white text-white hover:bg-white hover:text-black transition-all duration-300 bg-transparent"
              >
                Login
              </Button>
              <Button
                onClick={handleRegister}
                className="w-full justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300"
              >
                Register
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;