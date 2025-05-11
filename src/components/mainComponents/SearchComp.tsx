import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

type TaskType = "Test" | "Essay" | "Discussion";
type Tag =
  | "Первісне суспільство"
  | "Стародавній Схід"
  | "Античність"
  | "Середньовіччя"
  | "Відродження і Реформація"
  | "Новий час";

type Task = {
  id: number;
  title: string;
  type: TaskType;
  tag: Tag;
  createdAt: string;
};

const API_URL = "http://localhost:3000/tasks";

const SearchComp = () => {
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [selectedType, setSelectedType] = useState<TaskType | "All">("All");
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setTasks(response.data);
      } catch (error) {
        console.error("Помилка при завантаженні завдань:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (searchText.trim()) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedType !== "All") {
      result = result.filter((task) => task.type === selectedType);
    }

    if (selectedTag) {
      result = result.filter((task) => task.tag === selectedTag);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === "Newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [searchText, sortBy, selectedType, selectedTag, tasks]);

  const tags: Tag[] = [
    "Первісне суспільство",
    "Стародавній Схід",
    "Античність",
    "Середньовіччя",
    "Відродження і Реформація",
    "Новий час",
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#eef1f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: { xs: 2, md: 4 },
        gap: 4,
        flexWrap: "wrap",
      }}
    >
      {/* Filters */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 320,
          p: 3,
          bgcolor: "white",
          borderRadius: 4,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Пошук завдань
        </Typography>

        <TextField
          label="Пошук..."
          variant="outlined"
          fullWidth
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <FormControl fullWidth size="small">
          <InputLabel>Сортувати</InputLabel>
          <Select
            value={sortBy}
            label="Сортувати"
            onChange={(e: SelectChangeEvent) => setSortBy(e.target.value)}
          >
            <MenuItem value="Newest">Новіші</MenuItem>
            <MenuItem value="Oldest">Старіші</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Тип завдання</InputLabel>
          <Select
            value={selectedType}
            label="Тип завдання"
            onChange={(e) => {
              const value = e.target.value;
              if (
                value === "All" ||
                value === "Test" ||
                value === "Essay" ||
                value === "Discussion"
              ) {
                setSelectedType(value);
              }
            }}
          >
            <MenuItem value="All">Усі</MenuItem>
            <MenuItem value="Test">Тест</MenuItem>
            <MenuItem value="Essay">Стаття</MenuItem>
            <MenuItem value="Discussion">Розгорнута відповідь</MenuItem>
          </Select>
        </FormControl>

        <Box>
          <Typography variant="subtitle2" fontWeight="medium" mb={1}>
            Тематика
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                color={selectedTag === tag ? "primary" : "default"}
                variant={selectedTag === tag ? "filled" : "outlined"}
                onClick={() =>
                  setSelectedTag((prev) => (prev === tag ? null : tag))
                }
                clickable
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Tasks */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          bgcolor: "white",
          borderRadius: 4,
          border: "1px solid #ccc",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minHeight: "300px",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Завдання
        </Typography>

        {loading ? (
          <CircularProgress sx={{ margin: "0 auto" }} />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 2,
            }}
          >
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <Card
                  key={task.id}
                  sx={{
                    p: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: 3,
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      <strong>Тип:</strong> {task.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Тема:</strong> {task.tag}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography>Завдання не знайдено.</Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchComp;
