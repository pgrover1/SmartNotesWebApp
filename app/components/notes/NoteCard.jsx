import React, { useState } from "react";
import {
  getCategoryColor,
  getSentimentColor,
  formatDate,
  stringAvatar,
} from "../../lib/utils";
import { DeleteOutline, EditOutlined, Done, Close } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Avatar,
  Tooltip
} from "@mui/material";
import Badge from "../ui/Badge";

const NoteCard = ({
  note,
  onEdit,
  onDelete,
  isDeleting,
}) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  const confirmDelete = () => {
    onDelete(note.id);
    setIsConfirmingDelete(false);
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
  };
  
  const Subheader = ({ sentiment, categories }) => {
    return (
      <div>
        {categories.map((category) => (
          <Badge key={category.id} color={getCategoryColor(category.id)}>
            {category.name}
          </Badge>
        ))}
        {sentiment && (
          <Badge color={getSentimentColor(sentiment)}>{sentiment}</Badge>
        )}
      </div>
    );
  };
  // Determine card background color based on first category
  const categoryColor =
    note.categories.length > 0
      ? getCategoryColor(note.categories[0].id).replace(
          "bg-",
          "bg-opacity-10 bg-"
        )
      : "bg-white";

  return (
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
        <Avatar {...stringAvatar(note.title)} aria-label="note-avatar"/>
      }
        action={
          isConfirmingDelete ? (
            // Show confirmation buttons when deleting
            <>
              <Tooltip title="Confirm delete">
                <IconButton 
                  sx={{ color: "green" }}
                  onClick={confirmDelete}
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
                onClick={() => onEdit(note.id)}
              >
                <EditOutlined />
              </IconButton>

              <IconButton
                sx={{ color: "#E99D9D" }}
                onClick={handleDeleteClick}
              >
                <DeleteOutline />
              </IconButton>
            </>
          )
        }
        title={note.title}
        subheader={
          <Subheader categories={note.categories} sentiment={note.sentiment} />
        }
      ></CardHeader>

      <CardContent>
        <Typography variant="body1" component="div">
          {note.content}
        </Typography>

        {note.summary && (
          <div>
            <Typography variant="h6">Summary</Typography>
            <Typography variant="body2" color="textSecondary">
              {note.summary}
            </Typography>
          </div>
        )}
        <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
          Created: {formatDate(note.created_at)}
          {note.updated_at !== note.created_at && (
            <span className="ml-2">
              • Updated: {formatDate(note.updated_at)}
            </span>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;