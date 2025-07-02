// Security configuration
export const securityConfig = {
  // Content Security Policy
  csp: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", "data:", "https:"],
    'connect-src': ["'self'", "https://api.coingecko.com"],
    'font-src': ["'self'"]
  },
  
  // API endpoints whitelist
  allowedApis: [
    'https://api.coingecko.com/api/v3/coins/markets'
  ],
  
  // Input sanitization patterns
  patterns: {
    address: /^0x[a-fA-F0-9]{40}$/,
    amount: /^\d+(\.\d{1,8})?$/,
    coinId: /^[a-z0-9-]+$/
  }
};

// Input sanitization utility
export const sanitizeInput = (input, type) => {
  if (!input || typeof input !== 'string') return '';
  
  const pattern = securityConfig.patterns[type];
  if (pattern && !pattern.test(input)) {
    throw new Error(`Invalid ${type} format`);
  }
  
  // Basic XSS prevention
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

// API request wrapper with security checks
export const secureApiRequest = async (url, options = {}) => {
  // Check if URL is in whitelist
  const isAllowed = securityConfig.allowedApis.some(allowedUrl => 
    url.startsWith(allowedUrl)
  );
  
  if (!isAllowed) {
    throw new Error('Unauthorized API endpoint');
  }
  
  // Add security headers
  const secureOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  };
  
  return fetch(url, secureOptions);
};
