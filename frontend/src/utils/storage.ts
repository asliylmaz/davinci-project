// Local Storage utilities
export const storage = {
  // Set item in localStorage
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  // Get item from localStorage
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue || null;
    }
  },

  // Remove item from localStorage
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  // Clear all localStorage
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  // Check if key exists
  has: (key: string): boolean => {
    return localStorage.getItem(key) !== null;
  }
};

// Session Storage utilities
export const sessionStorage = {
  // Set item in sessionStorage
  set: (key: string, value: any): void => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
    }
  },

  // Get item from sessionStorage
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return defaultValue || null;
    }
  },

  // Remove item from sessionStorage
  remove: (key: string): void => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
    }
  },

  // Clear all sessionStorage
  clear: (): void => {
    try {
      window.sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  }
};

// Storage keys constants
export const STORAGE_KEYS = {
  USERS: 'davinci_users',
  POSTS: 'davinci_posts',
  USER_PREFERENCES: 'davinci_user_preferences',
  THEME: 'davinci_theme',
  LANGUAGE: 'davinci_language'
} as const;

// Cache utilities for API responses
export const cache = {
  // Cache API response
  set: (key: string, data: any, ttl: number = 5 * 60 * 1000): void => { // 5 minutes default
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl
    };
    storage.set(`cache_${key}`, cacheData);
  },

  // Get cached API response
  get: <T>(key: string): T | null => {
    const cached = storage.get(`cache_${key}`);
    if (!cached) return null;

    const { data, timestamp, ttl } = cached as { data: T; timestamp: number; ttl: number };
    const now = Date.now();

    // Check if cache is expired
    if (now - timestamp > ttl) {
      storage.remove(`cache_${key}`);
      return null;
    }

    return data;
  },

  // Clear specific cache
  clear: (key: string): void => {
    storage.remove(`cache_${key}`);
  },

  // Clear all cache
  clearAll: (): void => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('cache_')) {
        localStorage.removeItem(key);
      }
    });
  }
};
