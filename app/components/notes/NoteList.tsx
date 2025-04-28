import React, { useState } from "react";
import { Note, NoteUpdate } from "../../types";
import { Box, Grid, Stack, Typography, Button, Paper } from "@mui/material";
import {
  useDeleteNote,
  useUpdateNote,
  useSummarizeNote,
  useSuggestCategory,
  useNoteSentiment,
} from "../../lib/hooks";
import NoteCard from "./NoteCard";
import NoteForm from "./NoteForm";
import Card, { CardBody, CardHeader } from "../ui/Card";

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const deleteNote = useDeleteNote();
  const updateNote = useUpdateNote(editingNoteId || "");

  // Get the current note being edited
  const currentEditingNote = notes.find((note) => note.id === editingNoteId);

  // AI features for the current note - only enable when editing an existing note
  const summarize = useSummarizeNote(
    editingNoteId || "",
    undefined,
    undefined,
    {
      enabled: !!editingNoteId && !!currentEditingNote,
    }
  );

  const suggestCategory = useSuggestCategory(editingNoteId || "", {
    enabled: !!editingNoteId && !!currentEditingNote,
  });

  const sentiment = useNoteSentiment(editingNoteId || "", {
    enabled: !!editingNoteId && !!currentEditingNote,
  });

  const handleEdit = (noteId: string) => {
    setEditingNoteId(noteId);
  };

  const handleDelete = (noteId: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      deleteNote.mutate(noteId);
    }
  };

  const handleUpdate = (data: NoteUpdate) => {
    if (editingNoteId) {
      // Remove summary property from updates to existing notes
      const { summary, ...updateData } = data;

      updateNote.mutate(updateData, {
        onSuccess: () => setEditingNoteId(null),
      });
    }
  };

  const cancelEdit = () => {
    setEditingNoteId(null);
  };

  if (notes.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No notes found. Create one to get started!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {editingNoteId && (
        <Box>
          <Paper
            component="div"
            sx={{
              p: "20px 20px",
              my: "20px",
              alignItems: "center",
            }}
          >
            <Stack
              direction="row"
              alignItems="start"
              justifyContent="space-between"
            >
              <Typography variant="h6" component="h2" sx={{ mb: 5 }}>
                Edit Note{" "}
              </Typography>

              <Button onClick={cancelEdit}>Cancel</Button>
            </Stack>
            <NoteForm
              note={currentEditingNote}
              onSubmit={handleUpdate}
              isLoading={updateNote.isPending}
              suggestedCategory={suggestCategory.data || null}
              suggestedSentiment={sentiment.data?.sentiment}
              summary={summarize.data?.summary}
            />

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {summarize.isPending && (
                <div className="p-3 bg-gray-100 rounded">
                  <p className="text-sm font-medium">Generating summary...</p>
                </div>
              )}

              {suggestCategory.isPending && (
                <div className="p-3 bg-gray-100 rounded">
                  <p className="text-sm font-medium">Suggesting category...</p>
                </div>
              )}

              {sentiment.isPending && (
                <div className="p-3 bg-gray-100 rounded">
                  <p className="text-sm font-medium">Analyzing sentiment...</p>
                </div>
              )}
            </div>
          </Paper>
        </Box>
      )}

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {notes.map((note) => (
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={deleteNote.isPending}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NoteList;
