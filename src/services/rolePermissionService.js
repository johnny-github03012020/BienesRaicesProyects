import axios from 'axios';
import jwtAuthService from './jwtAuthService';
import activityLogService from './activityLogService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class RolePermissionService {
  constructor() {
    this.endpoint = `${API_URL}/roles-permissions`;
  }

  async getRoles() {
    try {
      const response = await axios.get(`${this.endpoint}/roles`, {
        headers: {
          Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener roles');
    }
  }

  async getPermissions() {
    try {
      const response = await axios.get(`${this.endpoint}/permissions`, {
        headers: {
          Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener permisos');
    }
  }

  async createRole(roleData) {
    try {
      const response = await axios.post(
        `${this.endpoint}/roles`,
        roleData,
        {
          headers: {
            Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
          }
        }
      );

      await activityLogService.logActivity('create_role', {
        role_name: roleData.name,
        permissions: roleData.permissions
      });

      return response.data;
    } catch (error) {
      throw new Error('Error al crear rol');
    }
  }

  async updateRole(roleId, roleData) {
    try {
      const response = await axios.put(
        `${this.endpoint}/roles/${roleId}`,
        roleData,
        {
          headers: {
            Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
          }
        }
      );

      await activityLogService.logActivity('update_role', {
        role_id: roleId,
        updates: roleData
      });

      return response.data;
    } catch (error) {
      throw new Error('Error al actualizar rol');
    }
  }

  async deleteRole(roleId) {
    try {
      await axios.delete(`${this.endpoint}/roles/${roleId}`, {
        headers: {
          Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
        }
      });

      await activityLogService.logActivity('delete_role', {
        role_id: roleId
      });

      return true;
    } catch (error) {
      throw new Error('Error al eliminar rol');
    }
  }

  async assignRoleToUser(userId, roleId) {
    try {
      const response = await axios.post(
        `${this.endpoint}/users/${userId}/roles`,
        { roleId },
        {
          headers: {
            Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
          }
        }
      );

      await activityLogService.logActivity('assign_role', {
        user_id: userId,
        role_id: roleId
      });

      return response.data;
    } catch (error) {
      throw new Error('Error al asignar rol al usuario');
    }
  }

  async removeRoleFromUser(userId, roleId) {
    try {
      await axios.delete(
        `${this.endpoint}/users/${userId}/roles/${roleId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
          }
        }
      );

      await activityLogService.logActivity('remove_role', {
        user_id: userId,
        role_id: roleId
      });

      return true;
    } catch (error) {
      throw new Error('Error al remover rol del usuario');
    }
  }

  async getUserRoles(userId) {
    try {
      const response = await axios.get(
        `${this.endpoint}/users/${userId}/roles`,
        {
          headers: {
            Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener roles del usuario');
    }
  }

  async getUserPermissions(userId) {
    try {
      const response = await axios.get(
        `${this.endpoint}/users/${userId}/permissions`,
        {
          headers: {
            Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener permisos del usuario');
    }
  }

  async checkPermission(userId, permission) {
    try {
      const response = await axios.get(
        `${this.endpoint}/users/${userId}/check-permission`,
        {
          params: { permission },
          headers: {
            Authorization: `Bearer ${jwtAuthService.getAccessToken()}`
          }
        }
      );
      return response.data.hasPermission;
    } catch (error) {
      return false;
    }
  }
}

const rolePermissionService = new RolePermissionService();
export default rolePermissionService;