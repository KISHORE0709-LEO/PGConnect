import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Building2, Calendar, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white hover:bg-white/20 transition-all duration-300"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center text-white font-semibold text-sm">
          {getInitials(user.fullName)}
        </div>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-20">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center text-white font-semibold">
                  {getInitials(user.fullName)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.fullName}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-600">{user.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="py-2">
              <button
                onClick={() => { navigate('/profile'); setIsOpen(false); }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
              >
                <User className="h-4 w-4 text-gray-500" />
                Profile
              </button>
              
              {user.role === 'owner' && (
                <button
                  onClick={() => { navigate('/owner/pg/1'); setIsOpen(false); }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                >
                  <Building2 className="h-4 w-4 text-gray-500" />
                  My PGs
                </button>
              )}
              
              {user.role === 'student' && (
                <button
                  onClick={() => { navigate('/student/bookings'); setIsOpen(false); }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                >
                  <Calendar className="h-4 w-4 text-gray-500" />
                  My Bookings
                </button>
              )}
              
              <hr className="my-2" />
              
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-3 transition-colors text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;