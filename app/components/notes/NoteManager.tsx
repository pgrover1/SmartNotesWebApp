import React, { useState } from 'react';
import { useNotes, useCreateNote, useSearchNotes, useCategories } from '../../lib/hooks';
import Card, { CardHeader, CardBody } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import { NoteCreate, NoteSearchQuery } from '../../types';
import TextField from '@mui/material/TextField';

const NoteManager: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState<NoteSearchQuery>({});
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  
  const { data: categories = [] } = useCategories();
  
  const { data: notes = [], isLoading } = useNotes(0, 100, {
    enabled: !searchQuery.keyword && !searchQuery.natural_language_query && !searchQuery.category_id
  });
  
  const { data: searchResults = [], isLoading: isSearching } = useSearchNotes(
    searchQuery,
    0,
    100,
    {
      enabled: !!searchQuery.keyword || !!searchQuery.natural_language_query || !!searchQuery.category_id
    }
  );
  
  const createNote = useCreateNote();

  const handleCreate = (data: NoteCreate) => {
    // When creating a new note, only send title and content
    // Set category_ids to undefined
    const { title, content } = data;
    
    createNote.mutate(
      { 
        title, 
        content, 
        category_ids: undefined  // Send undefined as category during creation
      }, 
      { onSuccess: () => setIsCreating(false) }
    );
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newQuery: NoteSearchQuery = {};
    
    if (searchInput.trim()) {
      // Check if the search looks like a natural language query
      if (searchInput.length > 10 && searchInput.includes(' ')) {
        newQuery.natural_language_query = searchInput;
      } else {
        newQuery.keyword = searchInput;
      }
    }
    
    if (selectedCategoryId) {
      newQuery.category_id = selectedCategoryId;
    }
    
    setSearchQuery(newQuery);
  };

  const clearSearch = () => {
    setSearchQuery({});
    setSearchInput('');
    setSelectedCategoryId('');
  };

  const displayedNotes = searchQuery.keyword || searchQuery.natural_language_query || searchQuery.category_id
    ? searchResults
    : notes;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-bold">Notes</h2>
            <Button 
              onClick={() => setIsCreating(!isCreating)}
              size="sm"
            >
              {isCreating ? 'Cancel' : 'Create Note'}
            </Button>
          </div>
        </CardHeader>
        
        {isCreating && (
          <CardBody>
            <NoteForm 
              onSubmit={handleCreate} 
              isLoading={createNote.isPending} 
            />
          </CardBody>
        )}
      </Card>

      <Card>
        <CardBody>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="flex-1">
              <TextField
                variant="standard"
                label="Search Notes"
                id="search"
                placeholder="Search notes by keyword"
                fullWidth
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            
            <div className="w-full sm:w-48 flex-shrink-0">
              <Select
                id="category_filter"
                options={[
                  { value: '', label: 'All Categories' },
                  ...categories.map(cat => ({ value: cat.id, label: cat.name }))
                ]}
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                fullWidth
              />
            </div>
            
            <div className="flex gap-2 mt-2 sm:mt-0">
              <Button type="submit" size="sm">
                Search
              </Button>
              
              {(searchQuery.keyword || searchQuery.natural_language_query || searchQuery.category_id) && (
                <Button 
                  type="button" 
                  variant="secondary" 
                  size="sm"
                  onClick={clearSearch}
                >
                  Clear
                </Button>
              )}
            </div>
          </form>
        </CardBody>
      </Card>

      {isLoading || isSearching ? (
        <div className="text-center py-4">Loading notes...</div>
      ) : (
        <NoteList notes={displayedNotes} />
      )}
    </div>
  );
};

export default NoteManager;