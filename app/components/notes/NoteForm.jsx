import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCategories } from "../../lib/hooks";
import { KeyboardArrowRight } from "@mui/icons-material";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  FormHelperText
} from "@mui/material";

const NoteForm = ({
  note,
  onSubmit,
  isLoading,
  suggestedCategory,
  suggestedSentiment,
  summary,
}) => {
  const { data: categories = [] } = useCategories();
  
  // Initialize the state with the first category from the note's categories if available
  const initialCategoryId = note?.category_ids?.length > 0 ? note.category_ids[0] : "";
  
  const [selectedCategories, setSelectedCategories] = useState(
    note?.category_ids || []
  );
  const [sentiment, setSentiment] = useState(note?.sentiment || "");
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId);
  const [noteSummary, setNoteSummary] = useState(
    note?.summary || summary || ""
  );

  // For debugging
  useEffect(() => {
    if (note) {
      console.log("Note categories:", note.category_ids);
      console.log("Selected category:", selectedCategory);
    }
  }, [note, selectedCategory]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: note?.title || "",
      content: note?.content || "",
      category_ids: note?.category_ids || [],
      // Don't include summary for existing notes (it will be read-only)
      ...(note ? {} : { summary: summary || "" }),
      sentiment: note?.sentiment || suggestedSentiment || "",
    },
  });

  // Watch for content changes to suggest a category
  const content = watch("content");

  // Use the suggested category if available when editing a note
  useEffect(() => {
    if (suggestedCategory && categories.length > 0 && note) {
      // Find the category by name (case insensitive)
      const suggestedCategoryObj = categories.find(
        (cat) => cat.name.toLowerCase() === suggestedCategory.category?.toLowerCase()
      );

      // If we found a matching category and it's not already selected
      if (
        suggestedCategoryObj &&
        !selectedCategories.includes(suggestedCategoryObj.id)
      ) {
        // If there are no categories currently selected, use the suggested one
        // Otherwise, keep the existing categories
        const newSelectedCategories =
          selectedCategories.length === 0
            ? [suggestedCategoryObj.id]
            : [...selectedCategories];

        setSelectedCategories(newSelectedCategories);
        setValue("category_ids", newSelectedCategories);
      }
    }
  }, [suggestedCategory, categories, note, selectedCategories, setValue]);

  // Use suggested sentiment if available
  useEffect(() => {
    if (suggestedSentiment && !sentiment) {
      setSentiment(suggestedSentiment);
      setValue("sentiment", suggestedSentiment);
    }
  }, [suggestedSentiment, sentiment, setValue]);

  // Use suggested summary if available
  useEffect(() => {
    if (summary && !noteSummary) {
      setNoteSummary(summary);
      setValue("summary", summary);
    }
  }, [summary, noteSummary, setValue]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setValue("category_ids", [categoryId]);
  };

  const handleSentimentChange = (e) => {
    setSentiment(e.target.value);
    setValue("sentiment", e.target.value);
  };

  const handleSummaryChange = (e) => {
    setNoteSummary(e.target.value);
    setValue("summary", e.target.value);
  };

  // Sentiment options
  const sentimentOptions = [
    { value: "", label: "Select sentiment" },
    { value: "Positive", label: "Positive" },
    { value: "Negative", label: "Negative" },
    { value: "Neutral", label: "Neutral" },
    { value: "Mixed", label: "Mixed" },
  ];

  return (
    <Container sx={{ py: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <TextField
          id="title"
          label="Title"
          fullWidth
          placeholder="Enter note title"
          sx={{ mb: 3 }}
          error={!!errors.title?.message}
          {...register("title", {
            required: "Title is required",
            maxLength: {
              value: 255,
              message: "Title cannot exceed 255 characters",
            },
          })}
        />

        <TextField
          id="content"
          label="Content"
          fullWidth
          placeholder="Enter note content"
          minRows={6}
          sx={{ mb: 3 }}
          error={!!errors.content?.message}
          {...register("content", {
            required: "Content is required",
          })}
        />

        {note && (
          <>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="category_ids-select-label">Categories</InputLabel>

              <Select
                id="category_ids"
                labelId="category_ids-select-label"
                label="Categories"
                fullWidth
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="h-32"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{`AI Category Suggestion: ${suggestedCategory?.category || 'None'}`}</FormHelperText>
              </FormControl>
            {/* <FormControl fullWidth>
              
              <InputLabel id="sentiment-select-label">Sentiment</InputLabel>

              <Select
                id="sentiment"
                labelId="sentiment-select-label"
                label="Sentiment"
                fullWidth
                value={sentiment}
                onChange={handleSentimentChange}
                sx={{ mb: 3 }}
              >
                {" "}
                {sentimentOptions.map((sentimentOption) => (
                  <MenuItem value={sentimentOption.value}>
                    {sentimentOption.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
            <div>
            <Typography 
              variant="h6"
              component="h2"
            >
                    AI Suggested Sentiment:
            </Typography>
   
            <Typography 
              variant="body2"
              component="p"
              sx={{mb:1}}>
              {suggestedSentiment || "No sentiment available"}
            </Typography>

            <Typography 
              variant="h6"
              component="h2"
            >
                AI Summary:
            </Typography>
   
            <Typography 
              variant="body2"
              component="p"
              sx={{mb:1}}>
                {noteSummary || "No summary available"}
                </Typography>            
            </div>
          </>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          endIcon={<KeyboardArrowRight />}
        >
          {isLoading ? "Saving..." : note ? "Update Note" : "Create Note"}
        </Button>
      </form>
    </Container>
  );
};

export default NoteForm;