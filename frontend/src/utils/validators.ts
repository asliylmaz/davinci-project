// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Username validation (alphanumeric + underscore, 3-20 chars)
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

// Name validation (letters, spaces, hyphens, 2-50 chars)
export const isValidName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s\-]{2,50}$/;
  return nameRegex.test(name.trim());
};

// Title validation (not empty, max 200 chars)
export const isValidTitle = (title: string): boolean => {
  return title.trim().length > 0 && title.trim().length <= 200;
};

// Body validation (max 5000 chars)
export const isValidBody = (body: string): boolean => {
  return body.length <= 5000;
};

// Form validation for user
export const validateUserForm = (data: { name: string; username: string; email: string }) => {
  const errors: string[] = [];

  if (!isValidName(data.name)) {
    errors.push('Name must be 2-50 characters long and contain only letters, spaces, and hyphens');
  }

  if (!isValidUsername(data.username)) {
    errors.push('Username must be 3-20 characters long and contain only letters, numbers, and underscores');
  }

  if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Form validation for post
export const validatePostForm = (data: { title: string; body?: string }) => {
  const errors: string[] = [];

  if (!isValidTitle(data.title)) {
    errors.push('Title is required and must be less than 200 characters');
  }

  if (data.body && !isValidBody(data.body)) {
    errors.push('Content must be less than 5000 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
