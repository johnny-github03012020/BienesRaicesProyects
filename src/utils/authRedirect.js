/**
 * Utility for handling authentication redirects
 */

// Store the current path for after login
export const storeRedirectPath = (path) => {
  try {
    console.log('Storing redirect path:', path);
    localStorage.setItem('authRedirectPath', path);
    return true;
  } catch (error) {
    console.error('Error storing redirect path:', error);
    return false;
  }
};

// Get the stored redirect path
export const getRedirectPath = () => {
  try {
    const path = localStorage.getItem('authRedirectPath');
    console.log('Retrieved redirect path:', path);
    return path;
  } catch (error) {
    console.error('Error getting redirect path:', error);
    return null;
  }
};

// Clear the stored redirect path
export const clearRedirectPath = () => {
  try {
    localStorage.removeItem('authRedirectPath');
    return true;
  } catch (error) {
    console.error('Error clearing redirect path:', error);
    return false;
  }
};

// Handle the redirect to login
export const redirectToLogin = () => {
  // Force a complete page reload to the login page
  window.location.replace('/login');
};