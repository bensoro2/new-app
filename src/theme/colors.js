export const lightTheme = {
  // Background
  background: '#f5f5f5',
  cardBackground: '#ffffff',
  headerBackground: '#6200ee',

  // Text
  text: '#333333',
  textSecondary: '#666666',
  textMuted: '#999999',
  textOnPrimary: '#ffffff',

  // UI Elements
  border: '#e0e0e0',
  inputBackground: '#f5f5f5',
  shadow: '#000000',

  // Status
  success: '#4CAF50',
  error: '#f44336',
  warning: '#FF9800',

  // Primary
  primary: '#6200ee',
  primaryLight: '#9d46ff',
  primaryDark: '#0a00b6',
};

export const darkTheme = {
  // Background
  background: '#121212',
  cardBackground: '#1e1e1e',
  headerBackground: '#1e1e1e',

  // Text
  text: '#ffffff',
  textSecondary: '#b3b3b3',
  textMuted: '#808080',
  textOnPrimary: '#ffffff',

  // UI Elements
  border: '#333333',
  inputBackground: '#2c2c2c',
  shadow: '#000000',

  // Status
  success: '#66BB6A',
  error: '#EF5350',
  warning: '#FFA726',

  // Primary
  primary: '#bb86fc',
  primaryLight: '#e7b9ff',
  primaryDark: '#8858c8',
};

export const getTheme = (isDark) => (isDark ? darkTheme : lightTheme);
