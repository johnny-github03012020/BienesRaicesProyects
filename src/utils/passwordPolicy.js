// Política de contraseñas y validación de seguridad

export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  maxLength: 128,
  preventCommonPasswords: true,
  preventUserInfo: true,
  passwordHistory: 5,
  expirationDays: 90
};

export const validatePassword = (password, userInfo = {}) => {
  const errors = [];

  // Validar longitud mínima
  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push(`La contraseña debe tener al menos ${PASSWORD_REQUIREMENTS.minLength} caracteres`);
  }

  // Validar longitud máxima
  if (password.length > PASSWORD_REQUIREMENTS.maxLength) {
    errors.push(`La contraseña no debe exceder ${PASSWORD_REQUIREMENTS.maxLength} caracteres`);
  }

  // Validar mayúsculas
  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('La contraseña debe contener al menos una letra mayúscula');
  }

  // Validar minúsculas
  if (PASSWORD_REQUIREMENTS.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('La contraseña debe contener al menos una letra minúscula');
  }

  // Validar números
  if (PASSWORD_REQUIREMENTS.requireNumbers && !/\d/.test(password)) {
    errors.push('La contraseña debe contener al menos un número');
  }

  // Validar caracteres especiales
  if (PASSWORD_REQUIREMENTS.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('La contraseña debe contener al menos un carácter especial');
  }

  // Prevenir información del usuario en la contraseña
  if (PASSWORD_REQUIREMENTS.preventUserInfo && userInfo) {
    const userInfoValues = Object.values(userInfo).filter(Boolean);
    for (const value of userInfoValues) {
      if (typeof value === 'string' && value.length > 2 && password.toLowerCase().includes(value.toLowerCase())) {
        errors.push('La contraseña no debe contener información personal');
        break;
      }
    }
  }

  // Validar contraseñas comunes
  if (PASSWORD_REQUIREMENTS.preventCommonPasswords) {
    const commonPasswords = [
      'password', '123456', 'qwerty', 'admin', 'welcome',
      'letmein', 'monkey', 'dragon', 'baseball', 'football'
    ];
    if (commonPasswords.includes(password.toLowerCase())) {
      errors.push('La contraseña es demasiado común');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const calculatePasswordStrength = (password) => {
  let strength = 0;
  const checks = {
    length: password.length >= PASSWORD_REQUIREMENTS.minLength,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    specialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    extraLength: password.length >= PASSWORD_REQUIREMENTS.minLength + 4
  };

  // Calcular puntuación
  strength += checks.length ? 20 : 0;
  strength += checks.uppercase ? 20 : 0;
  strength += checks.lowercase ? 20 : 0;
  strength += checks.numbers ? 20 : 0;
  strength += checks.specialChars ? 20 : 0;
  strength += checks.extraLength ? 20 : 0;

  // Limitar a 100
  strength = Math.min(100, strength);

  return {
    score: strength,
    level: strength < 40 ? 'débil' :
          strength < 70 ? 'moderada' :
          strength < 90 ? 'fuerte' : 'muy fuerte'
  };
};

export const generatePasswordRequirements = () => {
  return [
    `Mínimo ${PASSWORD_REQUIREMENTS.minLength} caracteres`,
    'Al menos una letra mayúscula',
    'Al menos una letra minúscula',
    'Al menos un número',
    'Al menos un carácter especial (!@#$%^&*(),.?":{}|<>)',
    `No debe exceder ${PASSWORD_REQUIREMENTS.maxLength} caracteres`,
    'No debe contener información personal',
    'No debe ser una contraseña común',
    `Se guardarán las últimas ${PASSWORD_REQUIREMENTS.passwordHistory} contraseñas`,
    `La contraseña expira después de ${PASSWORD_REQUIREMENTS.expirationDays} días`
  ];
};