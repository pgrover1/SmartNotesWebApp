"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useNotes, useSearchNotes, useCategories } from "./lib/hooks";
import NoteList from "./components/notes/NoteList";
import { NoteSearchQuery } from "./types";
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  IconButton,
  Paper,
  InputBase,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Clear, Search } from "@mui/icons-material";

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState<NoteSearchQuery>({});
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const { data: categories = [] } = useCategories();

  const { data: notes = [], isLoading } = useNotes(0, 100, {
    enabled:
      !searchQuery.keyword &&
      !searchQuery.natural_language_query &&
      !searchQuery.category_id,
  });

  const { data: searchResults = [], isLoading: isSearching } = useSearchNotes(
    searchQuery,
    0,
    100,
    {
      enabled:
        !!searchQuery.keyword ||
        !!searchQuery.natural_language_query ||
        !!searchQuery.category_id,
    }
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newQuery: NoteSearchQuery = {};

    if (searchInput.trim()) {
      // Check if the search looks like a natural language query
      if (searchInput.length > 10 && searchInput.includes(" ")) {
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
    setSearchInput("");
    setSelectedCategoryId("");
  };

  const displayedNotes =
    searchQuery.keyword ||
    searchQuery.natural_language_query ||
    searchQuery.category_id
      ? searchResults
      : notes;

  return (
    <Container sx={{ py: 2 }}>
      <div className="flex justify-between items-center">
        <Stack
          direction="row"
          spacing={2}
          py={4}
          justifyContent="space-between"
        >
          <Typography
            color="textSecondary"
            variant="h5"
            component="h2"
            sx={{ mb: 5 }}
          >
            My Notes
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="/notes/create">
              <Button
                variant="text"
                sx={{ width: "180px" }}
                startIcon={<AddCircleOutlineOutlinedIcon />}
              >
                New Note
              </Button>
            </Link>
            <Link href="/notes/category">
              <Button
                variant="text"
                sx={{ width: "180px" }}
                startIcon={<AddCircleOutlineOutlinedIcon />}
              >
                New Category
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              alignItems: "center",
              display: "flex",
              width: "100%",
            }}
            onSubmit={handleSearch}
            autoComplete="off"
          >
            {/* <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-start sm:items-center gap-2"> */}
            <InputBase
              sx={{ ml: 1 }}
              id="search"
              placeholder="Search notes by keyword or ask a question..."
              fullWidth
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            {/* <div className="w-full sm:w-48 flex-shrink-0">
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
            </div> */}
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <Search />
            </IconButton>
            {(searchQuery.keyword ||
              searchInput ||
              searchQuery.natural_language_query ||
              searchQuery.category_id) && (
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="clear"
                onClick={clearSearch}
              >
                <Clear />
              </IconButton>
            )}
          </Paper>
        </Stack>
      </div>
      <Box sx={{ py: 4 }}>
        {isLoading || isSearching ? (
          <Typography variant="body1" component="p" gutterBottom>
            Loading notes...
          </Typography>
        ) : (
          <NoteList notes={displayedNotes} />
        )}
      </Box>
    </Container>
  );
}
