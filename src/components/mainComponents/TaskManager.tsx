import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";

const API_URL = "http://localhost:3000/tasks";

const TaskManager = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskType, setTaskType] = useState<"Essay" | "Test" | "Discussion">(
    "Essay"
  );
  const [essayQuestion, setEssayQuestion] = useState("");
  const [discussionPrompt, setDiscussionPrompt] = useState("");
  const [tag, setTag] = useState("");
  const [testQuestions, setTestQuestions] = useState([
    { question: "", options: ["", "", "", ""], answerIndex: 0 },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTestQuestion = () => {
    setTestQuestions((prev) => [
      ...prev,
      { question: "", options: ["", "", "", ""], answerIndex: 0 },
    ]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      title: taskTitle,
      type: taskType,
      tag: tag,
      content:
        taskType === "Essay"
          ? { question: essayQuestion }
          : taskType === "Discussion"
          ? { prompt: discussionPrompt }
          : { questions: testQuestions },
    };

    try {
      await axios.post(API_URL, payload);
      alert("Завдання успішно збережено!");
      setTaskTitle("");
      setTaskType("Essay");
      setEssayQuestion("");
      setDiscussionPrompt("");
      setTag("");
      setTestQuestions([
        { question: "", options: ["", "", "", ""], answerIndex: 0 },
      ]);
    } catch (error) {
      console.error("Помилка при збереженні завдання:", error);
      alert("Помилка при збереженні завдання.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1000,
        margin: "0 auto",
        bgcolor: "white",
        borderRadius: 4,
        boxShadow: 3,
        p: 4,
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Створити історичне завдання
      </Typography>

      <TextField
        label="Назва завдання"
        fullWidth
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />

      <Box>
        <Typography mb={1}>Тип завдання</Typography>
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={taskType}
          onChange={(_, val) => val && setTaskType(val)}
        >
          <ToggleButton value="Essay">Есе</ToggleButton>
          <ToggleButton value="Test">Тест</ToggleButton>
          <ToggleButton value="Discussion">Обговорення</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <FormControl fullWidth>
        <InputLabel>Історичний період</InputLabel>
        <Select value={tag} onChange={(e) => setTag(e.target.value)}>
          <MenuItem value="Первісне суспільство">Первісне суспільство</MenuItem>
          <MenuItem value="Стародавній Схід">Стародавній Схід</MenuItem>
          <MenuItem value="Античність">Античність</MenuItem>
          <MenuItem value="Середньовіччя">Середньовіччя</MenuItem>
          <MenuItem value="Відродження і Реформація">
            Відродження і Реформація
          </MenuItem>
          <MenuItem value="Новий час">Новий час</MenuItem>
        </Select>
      </FormControl>

      {taskType === "Essay" && (
        <TextField
          label="Питання для есе"
          fullWidth
          multiline
          value={essayQuestion}
          onChange={(e) => setEssayQuestion(e.target.value)}
        />
      )}

      {taskType === "Discussion" && (
        <TextField
          label="Тема для обговорення"
          fullWidth
          multiline
          value={discussionPrompt}
          onChange={(e) => setDiscussionPrompt(e.target.value)}
        />
      )}

      {taskType === "Test" && (
        <Box display="flex" flexDirection="column" gap={2}>
          {testQuestions.map((q, index) => (
            <Box
              key={index}
              sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}
            >
              <TextField
                label={`Питання ${index + 1}`}
                fullWidth
                value={q.question}
                onChange={(e) => {
                  const updated = [...testQuestions];
                  updated[index].question = e.target.value;
                  setTestQuestions(updated);
                }}
              />
              {q.options.map((opt, idx) => (
                <TextField
                  key={idx}
                  label={`Варіант ${idx + 1}`}
                  fullWidth
                  value={opt}
                  onChange={(e) => {
                    const updated = [...testQuestions];
                    updated[index].options[idx] = e.target.value;
                    setTestQuestions(updated);
                  }}
                  sx={{ mb: 1 }}
                />
              ))}
              <TextField
                label="Індекс правильної відповіді (0-3)"
                type="number"
                value={q.answerIndex}
                onChange={(e) => {
                  const updated = [...testQuestions];
                  updated[index].answerIndex = parseInt(e.target.value, 10);
                  setTestQuestions(updated);
                }}
                inputProps={{ min: 0, max: 3 }}
              />
            </Box>
          ))}
          <Button variant="outlined" onClick={handleAddTestQuestion}>
            Додати питання
          </Button>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : "Зберегти завдання"}
      </Button>
    </Box>
  );
};

export default TaskManager;
