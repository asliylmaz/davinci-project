import type { User, Post, CreateUserDto, CreatePostDto, UpdateUserDto, UpdatePostDto } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Users API
export const usersApi = {
  // Fetch all users
  getAll: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },

  // Fetch user by ID
  getById: async (id: number): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  },

  // Create new user (simulated)
  create: async (userData: CreateUserDto): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  },

  // Update user (simulated)
  update: async (id: number, userData: UpdateUserDto): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...userData }),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return response.json();
  },

  // Delete user (simulated)
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  },
};

// Posts API
export const postsApi = {
  // Fetch all posts
  getAll: async (): Promise<Post[]> => {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  },

  // Fetch posts by user ID
  getByUserId: async (userId: number): Promise<Post[]> => {
    const response = await fetch(`${API_BASE_URL}/posts/user/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user posts');
    }
    return response.json();
  },

  // Fetch post by ID
  getById: async (id: number): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  },

  // Create new post (simulated)
  create: async (postData: CreatePostDto): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    return response.json();
  },

  // Update post (simulated)
  update: async (id: number, postData: UpdatePostDto): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...postData }),
    });
    if (!response.ok) {
      throw new Error('Failed to update post');
    }
    return response.json();
  },

  // Delete post (simulated)
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
  },
};
