// import axios from 'axios'

// export default axios.create ({
//   baseURL: 'http://localhost:8080'
// })

import axios from 'axios';
import { useRouter } from 'next/navigation';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Your Spring Boot backend URL
  withCredentials: true, // This is crucial for sending cookies
});

// Request interceptor to add CSRF token to non-GET requests
api.interceptors.request.use(config => {
  if (config.method !== 'get') {
    const csrfToken = getCookie('XSRF-TOKEN');
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      const router = useRouter();
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

// Helper function to get cookies
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export default api;