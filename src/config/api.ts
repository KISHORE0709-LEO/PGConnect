// API Configuration
const isDevelopment = import.meta.env.DEV;

export const API_CONFIG = {
  // Use local proxy in development, direct Google Cloud URL in production
  BASE_URL: isDevelopment ? '' : 'https://your-backend-url.run.app',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout'
    },
    PGS: {
      LIST: '/api/pgs',
      CREATE: '/api/pgs',
      UPDATE: '/api/pgs',
      DELETE: '/api/pgs'
    }
  }
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};