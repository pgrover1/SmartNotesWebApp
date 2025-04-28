// Note types
export interface Note {
  id: string;
  title: string;
  content: string;
  summary?: string;
  sentiment?: string;
  category_ids: string[];
  categories: Category[];
  created_at: string;
  updated_at: string;
}

export interface NoteCreate {
  title: string;
  content: string;
  category_ids?: string[];
}

export interface NoteUpdate {
  title?: string;
  content?: string;
  category_ids?: string[];
  summary?: string;
  sentiment?: string;
}

export interface NoteSearchQuery {
  keyword?: string;
  category_id?: string;
  natural_language_query?: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  notes_count?: number;
}

export interface CategoryCreate {
  name: string;
  description?: string;
}

export interface CategoryUpdate {
  name?: string;
  description?: string;
}