import type { User, Post, CreateUserDto, CreatePostDto, UpdateUserDto, UpdatePostDto } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Fetch helpers: timeout + centralized error handling
const DEFAULT_TIMEOUT_MS = 10000;

async function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit, timeoutMs: number = DEFAULT_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(input, { ...init, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(id);
  }
}

function sleep(ms: number) { return new Promise(res => setTimeout(res, ms)); }

async function safeFetch<T = unknown>(url: string, init?: RequestInit, timeoutMs?: number, retry: number = 2, backoffMs: number = 300): Promise<T> {
  try {
    const response = await fetchWithTimeout(url, init, timeoutMs);
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`Request failed ${response.status}: ${text || response.statusText}`);
    }
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return response.json() as Promise<T>;
    }
    // Fallback: try text and cast
    const text = await response.text();
    return text as unknown as T;
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      throw new Error('Request timeout');
    }
    if (retry > 0) {
      await sleep(backoffMs);
      return safeFetch<T>(url, init, timeoutMs, retry - 1, backoffMs * 2);
    }
    throw err;
  }
}

// Users API
export const usersApi = {
  // Fetch all users
  getAll: async (): Promise<User[]> => {
    return safeFetch<User[]>(`${API_BASE_URL}/users`);
  },

  // Fetch user by ID
  getById: async (id: number): Promise<User> => {
    return safeFetch<User>(`${API_BASE_URL}/users/${id}`);
  },

  // Create new user (simulated)
  create: async (userData: CreateUserDto): Promise<User> => {
    const response = await safeFetch<User>(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response;
  },

  // Update user (simulated)
  update: async (id: number, userData: UpdateUserDto): Promise<User> => {
    const response = await safeFetch<User>(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response;
  },

  // Delete user (simulated)
  delete: async (id: number): Promise<void> => {
    const response = await fetchWithTimeout(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
  },
};

// Posts API
export const postsApi = {
  // Fetch all posts
  getAll: async (): Promise<Post[]> => {
    return safeFetch<Post[]>(`${API_BASE_URL}/posts`);
  },

  // Fetch posts by user ID
  getByUserId: async (userId: number): Promise<Post[]> => {
    return safeFetch<Post[]>(`${API_BASE_URL}/posts/user/${userId}`);
  },

  // Fetch post by ID
  getById: async (id: number): Promise<Post> => {
    return safeFetch<Post>(`${API_BASE_URL}/posts/${id}`);
  },

  // Create new post (simulated)
  create: async (postData: CreatePostDto): Promise<Post> => {
    const response = await safeFetch<Post>(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    return response;
  },

  // Update post (simulated)
  update: async (id: number, postData: UpdatePostDto): Promise<Post> => {
    const response = await safeFetch<Post>(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    return response;
  },

  // Delete post (simulated)
  delete: async (id: number): Promise<void> => {
    const response = await fetchWithTimeout(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete post');
  },
};
