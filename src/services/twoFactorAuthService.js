import axios from 'axios';
import jwtAuthService from './jwtAuthService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class TwoFactorAuthService {
  constructor() {
    this.endpoint = `${API_URL}/2fa`;
  }

  async setupTwoFactor() {
    try {
      const response = await axios.post(
        `${this.endpoint}/setup`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
          }
        }
      );

      return {
        qrCodeUrl: response.data.qrCode,
        secret: response.data.secret
      };
    } catch (error) {
      throw new Error('Error al configurar la autenticación de dos factores');
    }
  }

  async verifyTwoFactor(token) {
    try {
      const response = await axios.post(
        `${this.endpoint}/verify`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
          }
        }
      );

      return response.data.isValid;
    } catch (error) {
      throw new Error('Error al verificar el código de dos factores');
    }
  }

  async enableTwoFactor(token) {
    try {
      const response = await axios.post(
        `${this.endpoint}/enable`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
          }
        }
      );

      return response.data.enabled;
    } catch (error) {
      throw new Error('Error al habilitar la autenticación de dos factores');
    }
  }

  async disableTwoFactor(token) {
    try {
      const response = await axios.post(
        `${this.endpoint}/disable`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
          }
        }
      );

      return response.data.disabled;
    } catch (error) {
      throw new Error('Error al deshabilitar la autenticación de dos factores');
    }
  }

  async generateBackupCodes() {
    try {
      const response = await axios.post(
        `${this.endpoint}/backup-codes`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
          }
        }
      );

      return response.data.backupCodes;
    } catch (error) {
      throw new Error('Error al generar códigos de respaldo');
    }
  }

  async validateBackupCode(code) {
    try {
      const response = await axios.post(
        `${this.endpoint}/validate-backup`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
          }
        }
      );

      return response.data.isValid;
    } catch (error) {
      throw new Error('Error al validar el código de respaldo');
    }
  }

  async isTwoFactorEnabled() {
    try {
      const response = await axios.get(
        `${this.endpoint}/status`,
        {
          headers: {
            Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
          }
        }
      );

      return response.data.enabled;
    } catch (error) {
      return false;
    }
  }
}

const twoFactorAuthService = new TwoFactorAuthService();
export default twoFactorAuthService;