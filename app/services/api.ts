import axios from 'axios';
import { 
  Note, 
  NoteCreate, 
  NoteUpdate, 
  NoteSearchQuery,
  Category, 
  CategoryCreate, 
  CategoryUpdate 
} from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Notes API
export const notesApi = {
  // Get all notes with pagination
  getNotes: async (skip = 0, limit = 100): Promise<Note[]> => {
    const response = await api.get(`/api/notes/?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  // Create a new note
  createNote: async (note: NoteCreate): Promise<Note> => {
    const response = await api.post('/api/notes/', note);
    return response.data;
  },

  // Get a note by ID
  getNote: async (noteId: string): Promise<Note> => {
    const response = await api.get(`/api/notes/${noteId}`);
    return response.data;
  },

  // Update a note
  updateNote: async (noteId: string, note: NoteUpdate): Promise<Note> => {
    const response = await api.put(`/api/notes/${noteId}`, note);
    return response.data;
  },

  // Delete a note
  deleteNote: async (noteId: string): Promise<Note> => {
    const response = await api.delete(`/api/notes/${noteId}`);
    return response.data;
  },

  // Search notes
  searchNotes: async (query: NoteSearchQuery, skip = 0, limit = 100): Promise<Note[]> => {
    const response = await api.post(`/api/notes/search?skip=${skip}&limit=${limit}`, query);
    return response.data;
  },

  // Get suggested category for a note
  suggestCategory: async (noteId: string): Promise<{ category: string }> => {
    const response = await api.post(`/api/notes/${noteId}/suggest-category`);
    return response.data;
  },

  // Get note sentiment
  getNoteSentiment: async (noteId: string): Promise<{ sentiment: string }> => {
    const response = await api.get(`/api/notes/${noteId}/sentiment`);
    return response.data;
  },

  // Summarize a note
  summarizeNote: async (
    noteId: string, 
    maxLength = 150, 
    model = 'gpt-4o'
  ): Promise<{ summary: string }> => {
    const response = await api.get(
      `/api/notes/${noteId}/summarize?max_length=${maxLength}&model=${model}`
    );
    return response.data;
  }
};

// Categories API
export const categoriesApi = {
  // Get all categories with pagination
  getCategories: async (skip = 0, limit = 100): Promise<Category[]> => {
    const response = await api.get(`/api/categories/?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  // Create a new category
  createCategory: async (category: CategoryCreate): Promise<Category> => {
    const response = await api.post('/api/categories/', category);
    return response.data;
  },

  // Get a category by ID
  getCategory: async (categoryId: string): Promise<Category> => {
    const response = await api.get(`/api/categories/${categoryId}`);
    return response.data;
  },

  // Update a category
  updateCategory: async (categoryId: string, category: CategoryUpdate): Promise<Category> => {
    const response = await api.put(`/api/categories/${categoryId}`, category);
    return response.data;
  },

  // Delete a category
  deleteCategory: async (categoryId: string): Promise<Category> => {
    const response = await api.delete(`/api/categories/${categoryId}`);
    return response.data;
  }
};