import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/main");
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      margin: 0,
      backgroundColor: '#0f172a',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif'
    }}>
      <style>{`
        .logo-container {
          text-align: center;
        }

        .logo-svg {
          width: 120px;
          height: 120px;
          margin-bottom: 30px;
          animation: fadeIn 1.5s ease-in-out;
        }

        .typing {
          font-size: 3.2rem;
          font-weight: bold;
          font-family: 'Inter', sans-serif;
          color: #3b82f6;
          border-right: 2px solid #3b82f6;
          white-space: nowrap;
          overflow: hidden;
          width: 0;
          letter-spacing: 6px;
          animation: typing 2s steps(10, end) forwards, blink 0.75s step-end infinite;
          margin: 0 auto;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 12ch; }
        }

        @keyframes blink {
          50% { border-color: transparent; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      
      <div className="logo-container">
        <svg className="logo-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/* Location Pin Shape */}
          <path 
            d="M100 20 C130 20 155 45 155 75 C155 105 100 160 100 160 S45 105 45 75 C45 45 70 20 100 20 Z" 
            fill="#3b82f6" 
          />
          {/* Inner White Circle */}
          <circle cx="100" cy="75" r="25" fill="white" />
          {/* Inner Blue Circle */}
          <circle cx="100" cy="75" r="18" fill="#1e40af" />
          {/* Buildings Icon */}
          <g transform="translate(88, 65)">
            <rect x="2" y="8" width="4" height="12" fill="#60a5fa" />
            <rect x="7" y="5" width="4" height="15" fill="#60a5fa" />
            <rect x="12" y="10" width="4" height="10" fill="#60a5fa" />
            <rect x="17" y="7" width="4" height="13" fill="#60a5fa" />
          </g>
        </svg>
        <div className="typing">PGConnect</div>
      </div>
    </div>
  );
};

export default Intro;