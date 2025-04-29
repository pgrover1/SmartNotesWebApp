import React, { useState } from "react";
import { getCategoryColor,stringAvatar } from "../../lib/utils";
import { useDeleteCategory, useUpdateCategory } from "../../lib/hooks";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Grid,
  Tooltip,
} from "@mui/material";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import CategoryForm from "./CategoryForm";
import { EditOutlined, DeleteOutline, Done, Close } from "@mui/icons-material";
import { red } from "@mui/material/colors";

const CategoryList = ({categories}) => {
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState(null);

  const deleteCategory = useDeleteCategory();
  const updateCategory = useUpdateCategory(editingCategoryId || "");

  const handleDeleteClick = (id) => {
    // Set the category as the one being deleted
    setDeletingCategoryId(id);
  };

  const confirmDelete = (id) => {
    // Actually perform the deletion
    deleteCategory.mutate(id);
    setDeletingCategoryId(null);
  };

  const cancelDelete = () => {
    setDeletingCategoryId(null);
  };

  const handleUpdate = (data) => {
    if (editingCategoryId) {
      updateCategory.mutate(data, {
        onSuccess: () => setEditingCategoryId(null),
      });
    }
  };

  if (categories.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 mb-2">No categories found.</p>
        <p className="text-gray-400 text-sm">Create one to get started!</p>
      </div>
    );
  }

  return (
    <Grid
    container
    spacing={{ xs: 2, md: 3 }}
    columns={{ xs: 4, sm: 8, md: 12 }}
    py={4}
  >
      {categories.map((category) => {
        const colorClass = getCategoryColor(category.id);
        const isDeleting = deletingCategoryId === category.id;
        const isEditing = editingCategoryId === category.id;
        return (
          <Grid size={{ xs: 2, sm: 4, md: 4 }} key={category.id}>
          <Card
            sx={{
              borderRadius: "20px",
              backgroundColor: "#fafafa",
              ":hover": {
                scale: "1.04",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <CardHeader
              avatar={
                <Avatar {...stringAvatar(category.name)} aria-label="category-avatar"/>
              }
              action={
                isDeleting ? (
                  // Show confirmation buttons when deleting
                  <>
                    <Tooltip title="Confirm delete">
                      <IconButton 
                        sx={{ color: "green" }}
                        onClick={() => confirmDelete(category.id)}
                      >
                        <Done />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel">
                      <IconButton 
                        sx={{ color: "gray" }}
                        onClick={cancelDelete}
                      >
                        <Close />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  // Show normal buttons otherwise
                  <>
                    <IconButton
                      sx={{ color: "#E99D9D" }}
                      onClick={() => setEditingCategoryId(category.id)}
                      disabled={isDeleting}
                    >
                      <EditOutlined />
                    </IconButton>

                    <IconButton
                      sx={{ color: "#E99D9D" }}
                      onClick={() => handleDeleteClick(category.id)}
                      disabled={isEditing}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </>
                )
              }
              title={category.name}
              subheader={`${category.notes_count || 0} notes`}
            />

            {isEditing ? (
              <CardContent>
                <CategoryForm
                  category={category}
                  onSubmit={handleUpdate}
                  isLoading={updateCategory.isPending}
                />
              </CardContent>
            ) : (
              category.description && (
                <CardContent>
                  <p className="text-gray-600">{category.description}</p>
                </CardContent>
              )
            )}
          </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CategoryList;