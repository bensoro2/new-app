import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = 'tasks';
const THEME_KEY = 'isDarkMode';

// Tasks
export const loadTasks = async () => {
  try {
    const data = await AsyncStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

// Theme
export const loadTheme = async () => {
  try {
    const data = await AsyncStorage.getItem(THEME_KEY);
    return data === 'true';
  } catch (error) {
    console.error('Error loading theme:', error);
    return false;
  }
};

export const saveTheme = async (isDark) => {
  try {
    await AsyncStorage.setItem(THEME_KEY, isDark.toString());
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};
