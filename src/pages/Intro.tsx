import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Sparkles } from "lucide-react";

const Intro = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 500);
    const timer2 = setTimeout(() => setShowText(true), 1200);
    const timer3 = setTimeout(() => setShowTagline(true), 2000);
    const timer4 = setTimeout(() => navigate("/home"), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="text-center z-10">
        {/* Logo Animation */}
        <div className={`mb-8 transition-all duration-1000 ${showLogo ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="relative">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-500">
              <Building2 className="h-16 w-16 text-white" />
              <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400 animate-spin" />
            </div>
          </div>
        </div>

        {/* Title Animation */}
        <div className={`transition-all duration-1000 delay-300 ${showText ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
            PG<span className="text-yellow-400">Connect</span>
          </h1>
        </div>

        {/* Tagline Animation */}
        <div className={`transition-all duration-1000 delay-700 ${showTagline ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-xl md:text-2xl text-blue-100 font-light">
            Connecting Students with Perfect Homes
          </p>
          <div className="mt-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      </div>

      {/* Skip Button */}
      <button 
        onClick={() => navigate("/home")}
        className="absolute bottom-8 right-8 text-blue-200 hover:text-white transition-colors text-sm"
      >
        Skip →
      </button>
    </div>
  );
};

export default Intro;