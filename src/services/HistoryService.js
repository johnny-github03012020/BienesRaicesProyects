/**
 * Servicio para gestionar el historial de cambios en la aplicación
 */
class HistoryService {
  constructor() {
    this.historyKey = 'app_history';
  }

  /**
   * Guarda un evento en el historial
   * @param {string} action - La acción realizada
   * @param {object} data - Datos relacionados con la acción
   */
  saveEvent(action, data = {}) {
    const history = this.getHistory();
    
    const event = {
      action,
      data,
      timestamp: new Date().toISOString(),
      userId: this.getCurrentUser() || 'anonymous'
    };
    
    history.push(event);
    
    // Limitar el historial a los últimos 100 eventos para evitar problemas de almacenamiento
    if (history.length > 100) {
      history.shift();
    }
    
    localStorage.setItem(this.historyKey, JSON.stringify(history));
  }

  /**
   * Obtiene todo el historial
   * @returns {Array} - El historial completo
   */
  getHistory() {
    const historyString = localStorage.getItem(this.historyKey);
    return historyString ? JSON.parse(historyString) : [];
  }

  /**
   * Obtiene el historial filtrado por acción
   * @param {string} action - La acción a filtrar
   * @returns {Array} - El historial filtrado
   */
  getHistoryByAction(action) {
    return this.getHistory().filter(event => event.action === action);
  }

  /**
   * Obtiene el usuario actual (si existe)
   * @returns {string|null} - ID del usuario o null
   */
  getCurrentUser() {
    const userString = localStorage.getItem('current_user');
    return userString ? JSON.parse(userString).id : null;
  }

  /**
   * Exporta el historial como un archivo JSON
   */
  exportHistory() {
    const history = this.getHistory();
    const dataStr = JSON.stringify(history, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `app-history-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  /**
   * Limpia todo el historial
   */
  clearHistory() {
    localStorage.removeItem(this.historyKey);
  }
}

// Create an instance of the class and export it
const historyService = new HistoryService();

export default historyService;