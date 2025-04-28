import React, { useState } from "react";
import { useCategories, useCreateCategory } from "../../lib/hooks";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import { Stack, Typography, Button } from "@mui/material";
import { AddCircleOutlineOutlined, Clear } from "@mui/icons-material";

const CategoryManager = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { data: categories = [], isLoading } = useCategories();
  const createCategory = useCreateCategory();

  const handleCreate = (data) => {
    createCategory.mutate(data, {
      onSuccess: () => setIsCreating(false),
    });
  };

  return (
    <div className="space-y-6">
      <Stack direction="row" alignItems="start" justifyContent="space-between">
        <Typography
          color="textSecondary"
          variant="h5"
          component="h2"
          sx={{ mb: 5 }}
        >
          Categories
        </Typography>
        <Button onClick={() => setIsCreating(!isCreating)} startIcon={isCreating?<Clear/>:<AddCircleOutlineOutlined />}>
          {isCreating ? "Cancel" : "Create a new category"}
        </Button>
      </Stack>
      {isCreating && (
        <CategoryForm
          onSubmit={handleCreate}
          isLoading={createCategory.isPending}
        />
      )}

      {isLoading ? (
        <div className="text-center py-4">Loading categories...</div>
      ) : (
        <CategoryList categories={categories} />
      )}
    </div>
  );
};

export default CategoryManager;