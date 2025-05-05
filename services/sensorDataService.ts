import api from '@/api/axios';
import axios from 'axios';

interface Payload {
  value: string;
  condition: string;
  timestamp: string;
  alert: boolean;
}
export const sensorData = async (): Promise<Payload> => {
    const controller = new AbortController();
    try {
      const response = await api.get<Payload>('api/sensor/gas',{
        signal : controller.signal,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      }
      throw new Error('No value detected');
    }
  };
  