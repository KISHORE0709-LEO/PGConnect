import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Building2, Calendar, LogOut, ChevronDown, CreditCard, Heart, Plus, AlertCircle, MessageSquare } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine context based on current route
  const getContext = () => {
    if (location.pathname.startsWith('/student')) return 'student';
    if (location.pathname.startsWith('/owner')) return 'owner';
    return 'homepage';
  };

  const context = getContext();

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
          {getInitials(user.name)}
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
                  {getInitials(user.name)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-600">{user.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="py-2">
              {/* Profile - Always visible */}
              <button
                onClick={() => { 
                  window.location.href = '/profile';
                }}
                className="w-full px-4 py-2 text-left hover:bg-blue-50 flex items-center gap-3 transition-colors hover:text-blue-600"
              >
                <User className="h-4 w-4 text-gray-500" />
                Profile
              </button>
              
              {/* Context-aware menu items */}
              {context === 'student' && (
                <>
                  <button
                    onClick={() => { navigate('/student/bookings'); setIsOpen(false); }}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 flex items-center gap-3 transition-colors hover:text-blue-600"
                  >
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>My Bookings</span>
                    <Badge className="ml-auto bg-blue-100 text-blue-800 text-xs">2</Badge>
                  </button>
                  
                  <button
                    onClick={() => { navigate('/student/payments'); setIsOpen(false); }}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 flex items-center gap-3 transition-colors hover:text-blue-600"
                  >
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    Payment History
                  </button>
                </>
              )}
              
              {context === 'owner' && (
                <>
                  <button
                    onClick={() => { navigate('/owner/register-pg'); setIsOpen(false); }}
                    className="w-full px-4 py-2 text-left hover:bg-teal-50 flex items-center gap-3 transition-colors hover:text-teal-600"
                  >
                    <Plus className="h-4 w-4 text-gray-500" />
                    Register New PG
                  </button>
                  
                  <button
                    onClick={() => { navigate('/owner/my-pgs'); setIsOpen(false); }}
                    className="w-full px-4 py-2 text-left hover:bg-teal-50 flex items-center gap-3 transition-colors hover:text-teal-600"
                  >
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <span>My PGs</span>
                    <Badge className="ml-auto bg-teal-100 text-teal-800 text-xs">3</Badge>
                  </button>
                  
                  <button
                    onClick={() => { navigate('/owner/pending-payments'); setIsOpen(false); }}
                    className="w-full px-4 py-2 text-left hover:bg-orange-50 flex items-center gap-3 transition-colors hover:text-orange-600"
                  >
                    <AlertCircle className="h-4 w-4 text-gray-500" />
                    <span>Pending Payments</span>
                    <Badge className="ml-auto bg-orange-100 text-orange-800 text-xs">7</Badge>
                  </button>
                </>
              )}
              
              <hr className="my-2" />
              
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-3 transition-colors text-red-600 hover:text-red-700"
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