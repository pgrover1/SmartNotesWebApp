'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {Container,Typography,TextField,Button,Stack} from '@mui/material'
import {KeyboardArrowRight} from '@mui/icons-material'
import { useCreateNote } from '../../lib/hooks';
import CategoryManager from '../../components/categories/CategoryManager';


export default function CreateNotePage() {
  const router = useRouter();
  const createNote = useCreateNote();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    
    if (!title || !content) {
      return;
    }
    
    // Create note with title and content only, category_ids as undefined
    createNote.mutate(
      { 
        title, 
        content,
        category_ids: undefined
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
    
      
      <CategoryManager/>
    </Container>
  );
}