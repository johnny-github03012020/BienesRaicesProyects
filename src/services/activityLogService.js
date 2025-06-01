import axios from 'axios';
import jwtAuthService from './jwtAuthService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ActivityLogService {
  constructor() {
    this.endpoint = `${API_URL}/activity-logs`;
  }

  async logActivity(action, details) {
    try {
      const user = jwtAuthService.getCurrentUser();
      if (!user) throw new Error('Usuario no autenticado');

      const logData = {
        user_id: user.id,
        action,
        details,
        ip_address: await this.getClientIP(),
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString()
      };

      await axios.post(this.endpoint, logData, {
        headers: {
          Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
        }
      });

      return true;
    } catch (error) {
      console.error('Error al registrar actividad:', error);
      return false;
    }
  }

  async getActivityLogs(filters = {}) {
    try {
      const response = await axios.get(this.endpoint, {
        params: filters,
        headers: {
          Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error al obtener registros de actividad:', error);
      throw error;
    }
  }

  async getClientIP() {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
    } catch (error) {
      return 'unknown';
    }
  }

  async getAdminActivities(startDate, endDate) {
    try {
      const response = await axios.get(`${this.endpoint}/admin`, {
        params: { startDate, endDate },
        headers: {
          Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error al obtener actividades administrativas:', error);
      throw error;
    }
  }

  async exportActivityLogs(format = 'csv', filters = {}) {
    try {
      const response = await axios.get(`${this.endpoint}/export`, {
        params: { format, ...filters },
        headers: {
          Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
        },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `activity_logs.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      return true;
    } catch (error) {
      console.error('Error al exportar registros de actividad:', error);
      throw error;
    }
  }
}

const activityLogService = new ActivityLogService();
export default activityLogService;