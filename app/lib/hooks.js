import { 
  useQuery, 
  useMutation, 
  useQueryClient
} from '@tanstack/react-query';
import { 
  notesApi, 
  categoriesApi 
} from '../services/api';

// Note Hooks
export const useNotes = (skip = 0, limit = 100, options = {}) => {
  return useQuery({
    queryKey: ['notes', skip, limit],
    queryFn: () => notesApi.getNotes(skip, limit),
    ...options
  });
};

export const useNote = (noteId, options = {}) => {
  return useQuery({
    queryKey: ['note', noteId],
    queryFn: () => notesApi.getNote(noteId),
    enabled: !!noteId,
    ...options
  });
};

export const useSearchNotes = (query, skip = 0, limit = 100, options = {}) => {
  return useQuery({
    queryKey: ['notes', 'search', query, skip, limit],
    queryFn: () => notesApi.searchNotes(query, skip, limit),
    enabled: !!query,
    ...options
  });
};

export const useCreateNote = (options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (note) => notesApi.createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    ...options
  });
};

export const useUpdateNote = (noteId, options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (note) => notesApi.updateNote(noteId, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['note', noteId] });
    },
    ...options
  });
};

export const useDeleteNote = (options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (noteId) => notesApi.deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    ...options
  });
};

export const useSuggestCategory = (noteId, options = {}) => {
  return useQuery({
    queryKey: ['note', noteId, 'suggestCategory'],
    queryFn: () => notesApi.suggestCategory(noteId),
    enabled: !!noteId,
    ...options
  });
};

export const useNoteSentiment = (noteId, options = {}) => {
  return useQuery({
    queryKey: ['note', noteId, 'sentiment'],
    queryFn: () => notesApi.getNoteSentiment(noteId),
    enabled: !!noteId,
    ...options
  });
};

export const useSummarizeNote = (
  noteId,
  maxLength = 150,
  model = 'gpt-4o',
  options = {}
) => {
  return useQuery({
    queryKey: ['note', noteId, 'summarize', maxLength, model],
    queryFn: () => notesApi.summarizeNote(noteId, maxLength, model),
    enabled: !!noteId,
    ...options
  });
};

// Category Hooks
export const useCategories = (skip = 0, limit = 100, options = {}) => {
  return useQuery({
    queryKey: ['categories', skip, limit],
    queryFn: () => categoriesApi.getCategories(skip, limit),
    ...options
  });
};

export const useCategory = (categoryId, options = {}) => {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => categoriesApi.getCategory(categoryId),
    enabled: !!categoryId,
    ...options
  });
};

export const useCreateCategory = (options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (category) => categoriesApi.createCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    ...options
  });
};

export const useUpdateCategory = (categoryId, options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (category) => categoriesApi.updateCategory(categoryId, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', categoryId] });
    },
    ...options
  });
};

export const useDeleteCategory = (options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (categoryId) => categoriesApi.deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    ...options
  });
};