import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";

type Topic = {
  id: number;
  title: string;
};

type Comment = {
  id: number;
  topicId: number;
  author: string;
  content: string;
  createdAt: string;
};

const initialTopics: Topic[] = [
  { id: 1, title: "Київська Русь: становлення держави" },
  { id: 2, title: "Козацька доба: гетьманщина та битви" },
  { id: 3, title: "Україна у XX столітті: війни та незалежність" },
];

const initialComments: Comment[] = [
  {
    id: 1,
    topicId: 1,
    author: "Історик2025",
    content: "Яку роль відіграв князь Володимир у хрещенні Русі?",
    createdAt: "2025-04-20",
  },
  {
    id: 2,
    topicId: 1,
    author: "Анна_Іст",
    content: "Він зробив християнство державною релігією, що об'єднало народ.",
    createdAt: "2025-04-21",
  },
  {
    id: 3,
    topicId: 2,
    author: "КозакМикита",
    content: "Чи можна вважати Богдана Хмельницького засновником гетьманщини?",
    createdAt: "2025-04-22",
  },
];

const ForumComp = () => {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [selectedTopicId, setSelectedTopicId] = useState<number>(1);
  const [newComment, setNewComment] = useState("");
  const [newTopicTitle, setNewTopicTitle] = useState("");

  const selectedTopic = topics.find((t) => t.id === selectedTopicId);
  const filteredComments = comments.filter(
    (comment) => comment.topicId === selectedTopicId
  );

  const handlePostComment = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: comments.length + 1,
        topicId: selectedTopicId,
        author: "Користувач", // Можна замінити на реального юзера
        content: newComment,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  const handleAddTopic = () => {
    const trimmed = newTopicTitle.trim();
    if (trimmed) {
      const newTopic: Topic = {
        id: topics.length + 1,
        title: trimmed,
      };
      setTopics([...topics, newTopic]);
      setNewTopicTitle("");
      setSelectedTopicId(newTopic.id);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f0ec",
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        p: { xs: 2, md: 4 },
      }}
    >
      {/* Список тем + Створення нової */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 300,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          p: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Теми обговорення
        </Typography>
        <List>
          {topics.map((topic) => (
            <ListItemButton
              key={topic.id}
              selected={selectedTopicId === topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              sx={{ borderRadius: 2 }}
            >
              <ListItemText primary={topic.title} />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <TextField
          label="Нова тема"
          fullWidth
          value={newTopicTitle}
          onChange={(e) => setNewTopicTitle(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 1,
            backgroundColor: "#6a1b9a",
            textTransform: "none",
            "&:hover": { backgroundColor: "#4a148c" },
          }}
          onClick={handleAddTopic}
        >
          Створити тему
        </Button>
      </Box>

      {/* Обговорення */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {selectedTopic?.title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ flex: 1, overflowY: "auto", maxHeight: 400 }}>
          {filteredComments.length ? (
            filteredComments.map((comment) => (
              <Paper
                key={comment.id}
                variant="outlined"
                sx={{ p: 2, mb: 2, borderRadius: 2 }}
              >
                <Typography variant="subtitle2" fontWeight="medium">
                  {comment.author} — {comment.createdAt}
                </Typography>
                <Typography variant="body1">{comment.content}</Typography>
              </Paper>
            ))
          ) : (
            <Typography color="text.secondary">Немає коментарів</Typography>
          )}
        </Box>

        {/* Додавання коментаря */}
        <TextField
          label="Ваш коментар"
          multiline
          rows={3}
          fullWidth
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Box textAlign="right">
          <Button
            variant="contained"
            onClick={handlePostComment}
            sx={{
              mt: 1,
              backgroundColor: "#2e7d32",
              textTransform: "none",
              "&:hover": { backgroundColor: "#1b5e20" },
            }}
          >
            Надіслати
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ForumComp;
