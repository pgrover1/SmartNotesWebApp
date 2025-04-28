'use client';
 
import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
 
import Link from 'next/link';
import {Container,Typography,TextField,Button,Stack, MenuItem, FormControl, InputLabel, Select} from '@mui/material'
import {KeyboardArrowRight} from '@mui/icons-material'
import { useCreateNote, useCategories } from '../../lib/hooks';
 
 
export default function CreateNotePage() {
  const router = useRouter();
  const createNote = useCreateNote();
  const [categoryId, setCategoryId] = useState();
  const { data: categories = [] } = useCategories();
  
  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title');
    const content = formData.get('content');
    
    if (!title || !content) {
      return;
    }
    
    // Create note with title and content only, category_ids as undefined
    createNote.mutate(
      {
        title,
        content,
        category_id: categoryId
      },
      {
        onSuccess: () => {
          router.push('/');
        }
      }
    );
  };
  
  return (
    <Container sx={{py:2}}>
      <div className="mb-6">
        {/* <Link href="/notes" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back to Notes</span>
        </Link> */}
      </div>
      
      <Typography
        color="textSecondary"
        variant="h5"
        component="h2"
        sx={{mb:5}}
 
      >
        Create a New Note
      </Typography>
      
        {/* <Typography
        component="h3"
        gutterBottom
      >Note Details</Typography> */}
        
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              id="title"
              name="title"
              label="Title"
              placeholder="Enter note title"
              required
              fullWidth
              sx={{mb:5}}
 
            />
            
            <TextField
              id="content"
              name="content"
              label="Content"
              placeholder="Enter note content"
              maxRows={10}
              sx={{mb:3}}
              required
              fullWidth
            />
            
            <FormControl fullWidth>
              <InputLabel id="category_ids-select-label">Categories</InputLabel>
 
              <Select
                id="category_ids"
                labelId="category_ids-select-label"
                value={categoryId}
                label="Categories"
                fullWidth
                className="h-32"
                sx={{ mb: 3 }}
                onChange={handleCategoryChange}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography color="textSecondary"
        variant="body2"
        component="p"
        gutterBottom>
              After creating your note, you'll be able to add categories and see AI-generated summary and sentiment analysis.
            </Typography>
          
          <Stack direction="row" spacing={2} sx={{mt:3}}>
          <Link href="/">
              <Button type="button" variant="outlined">
                Discard
              </Button>
            </Link>
            <Button type="submit" variant="contained" disabled={createNote.isPending} endIcon={<KeyboardArrowRight />}>
              {createNote.isPending ? 'Creating...' : 'Create Note'}
            </Button>
          </Stack>
        </form>
    </Container>
  );
}