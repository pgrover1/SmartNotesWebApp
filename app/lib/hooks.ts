import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions
} from '@tanstack/react-query';
import { 
  notesApi, 
  categoriesApi 
} from '../services/api';
import {
  Note,
  NoteCreate,
  NoteUpdate,
  NoteSearchQuery,
  Category,
  CategoryCreate,
  CategoryUpdate
} from '../types';

// Note Hooks
export const useNotes = (skip = 0, limit = 100, options?: UseQueryOptions<Note[]>) => {
  return useQuery({
    queryKey: ['notes', skip, limit],
    queryFn: () => notesApi.getNotes(skip, limit),
    ...options
  });
};

export const useNote = (noteId: string, options?: UseQueryOptions<Note>) => {
  return useQuery({
    queryKey: ['note', noteId],
    queryFn: () => notesApi.getNote(noteId),
    enabled: !!noteId,
    ...options
  });
};

export const useSearchNotes = (query: NoteSearchQuery, skip = 0, limit = 100, options?: UseQueryOptions<Note[]>) => {
  return useQuery({
    queryKey: ['notes', 'search', query, skip, limit],
    queryFn: () => notesApi.searchNotes(query, skip, limit),
    enabled: !!query,
    ...options
  });
};

export const useCreateNote = (options?: UseMutationOptions<Note, Error, NoteCreate>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (note: NoteCreate) => notesApi.createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    ...options
  });
};

export const useUpdateNote = (noteId: string, options?: UseMutationOptions<Note, Error, NoteUpdate>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (note: NoteUpdate) => notesApi.updateNote(noteId, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['note', noteId] });
    },
    ...options
  });
};

export const useDeleteNote = (options?: UseMutationOptions<Note, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (noteId: string) => notesApi.deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    ...options
  });
};

export const useSuggestCategory = (noteId: string, options?: UseQueryOptions<{ category: string }>) => {
  return useQuery({
    queryKey: ['note', noteId, 'suggestCategory'],
    queryFn: () => notesApi.suggestCategory(noteId),
    enabled: !!noteId,
    ...options
  });
};

export const useNoteSentiment = (noteId: string, options?: UseQueryOptions<{ sentiment: string }>) => {
  return useQuery({
    queryKey: ['note', noteId, 'sentiment'],
    queryFn: () => notesApi.getNoteSentiment(noteId),
    enabled: !!noteId,
    ...options
  });
};

export const useSummarizeNote = (
  noteId: string,
  maxLength = 150,
  model = 'gpt-4o',
  options?: UseQueryOptions<{ summary: string }>
) => {
  return useQuery({
    queryKey: ['note', noteId, 'summarize', maxLength, model],
    queryFn: () => notesApi.summarizeNote(noteId, maxLength, model),
    enabled: !!noteId,
    ...options
  });
};

// Category Hooks
export const useCategories = (skip = 0, limit = 100, options?: UseQueryOptions<Category[]>) => {
  return useQuery({
    queryKey: ['categories', skip, limit],
    queryFn: () => categoriesApi.getCategories(skip, limit),
    ...options
  });
};

export const useCategory = (categoryId: string, options?: UseQueryOptions<Category>) => {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => categoriesApi.getCategory(categoryId),
    enabled: !!categoryId,
    ...options
  });
};

export const useCreateCategory = (options?: UseMutationOptions<Category, Error, CategoryCreate>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (category: CategoryCreate) => categoriesApi.createCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    ...options
  });
};

export const useUpdateCategory = (categoryId: string, options?: UseMutationOptions<Category, Error, CategoryUpdate>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (category: CategoryUpdate) => categoriesApi.updateCategory(categoryId, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', categoryId] });
    },
    ...options
  });
};

export const useDeleteCategory = (options?: UseMutationOptions<Category, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (categoryId: string) => categoriesApi.deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    ...options
  });
};