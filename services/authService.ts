import api from '@/api/axios';
import axios from 'axios';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  interface Credentials {
    email: string;
    password: string;
  }
  
  interface AuthResponse {
    message: string;
  }

export const signup = async (userData: UserData): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('api/auth/register', userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      }
      throw new Error('Registration failed');
    }
  };
  
  export const login = async (credentials: Credentials): Promise<AuthResponse> => {
    try {
      
      const response = await api.post<AuthResponse>('api/auth/authenticate', credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      }
      throw new Error('Login failed');
    }
  };
  
  export const logout = async (): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('api/auth/logout');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      }
      throw new Error('Logout failed');
    }
  };
  
  