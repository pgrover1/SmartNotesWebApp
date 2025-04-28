import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import { CategoryCreate, CategoryUpdate, Category } from '../../types';
import { TextField,Button } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';

interface CategoryFormProps {
  category?: Category;
  onSubmit: (data: CategoryCreate | CategoryUpdate) => void;
  isLoading: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ 
  category, 
  onSubmit, 
  isLoading 
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<CategoryCreate>({
    defaultValues: {
      name: category?.name || '',
      description: category?.description || '',
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <TextField
        id="name"
        label="Category Name"
        fullWidth
        placeholder="Enter category name"
        sx={{ mb: 3 }}
        error={!!errors.name?.message}
        {...register('name', { 
          required: 'Category name is required',
          maxLength: {
            value: 100,
            message: 'Category name cannot exceed 100 characters'
          }
        })}
      />

      <TextField
        id="description"
        label="Description (optional)"
        fullWidth
        placeholder="Enter category description"
        minRows={3}
        sx={{ mb: 3 }}
        error={!!errors.description?.message}
        {...register('description', {
          maxLength: {
            value: 25500,
            message: 'Description cannot exceed 255 characters'
          }
        })}
      />

      <div className="flex justify-end space-x-2">
        <Button type="submit"  variant="contained"
                  disabled={isLoading}
                  endIcon={<KeyboardArrowRight />}>
          {isLoading 
            ? 'Saving...' 
            : category 
              ? 'Update Category' 
              : 'Create Category'
          }
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;