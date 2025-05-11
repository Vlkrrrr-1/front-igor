import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

const TASKS_API = "http://localhost:3000/tasks";
const RESULTS_API = "http://localhost:3000/tasks/results";

const HomeComp = () => {
  const [theme, setTheme] = useState<HistoryTag | "Випадкове">("Випадкове");
  const [taskType, setTaskType] = useState("Essay");
  const [showTask, setShowTask] = useState(false);
  const [essayAnswer, setEssayAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  type TaskType = "Essay" | "Test" | "Discussion";
  type HistoryTag =
    | "Первісне суспільство"
    | "Стародавній Схід"
    | "Античність"
    | "Середньовіччя"
    | "Відродження і Реформація"
    | "Новий час";

  interface Task {
    id: number;
    title: string;
    type: TaskType;
    tag: HistoryTag;
    content: any;
    status: "Completed" | "In Progress";
  }

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(TASKS_API);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleStart = () => {
    setCurrentTaskIndex(0);
    setShowTask(true);
  };

  const filteredTasks =
    theme === "Випадкове"
      ? tasks.filter((t) => t.type === taskType)
      : tasks.filter((t) => t.tag === theme && t.type === taskType);

  const task: Task | undefined =
    filteredTasks.length > 0 ? filteredTasks[currentTaskIndex] : undefined;

  const handleSubmit = async () => {
    if (!task) return;

    let userAnswer = "";

    if (task.type === "Essay" || task.type === "Discussion") {
      userAnswer = essayAnswer;
      setEssayAnswer("");
    } else if (task.type === "Test") {
      userAnswer = selectedOption;
      setSelectedOption("");
    }

    try {
      await axios.post(RESULTS_API, {
        taskId: task.id,
        taskType: task.type,
        answer: userAnswer,
      });
      console.log("Result sent");
    } catch (err) {
      console.error("Error sending result:", err);
    }

    const nextIndex = currentTaskIndex + 1;
    if (nextIndex < filteredTasks.length) {
      setCurrentTaskIndex(nextIndex);
    } else {
      setShowTask(false);
      alert("All tasks completed!");
    }
  };

  return (
    <Box
      sx={{ backgroundColor: "rgb(253, 242, 240)", minHeight: "100vh", p: 4 }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 700, textAlign: "center" }}
      >
        {`Hi, ${localStorage.getItem("username")}`}
      </Typography>

      <Box
        sx={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            p: 4,
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Оберіть історичну тематику
          </Typography>
          <Select
            value={theme}
            onChange={(e) =>
              setTheme(e.target.value as HistoryTag | "Випадкове")
            }
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          >
            <MenuItem value="Випадкове">Випадкова</MenuItem>
            <MenuItem value="Первісне суспільство">
              Первісне суспільство
            </MenuItem>
            <MenuItem value="Стародавній Схід">Стародавній Схід</MenuItem>
            <MenuItem value="Античність">Античність</MenuItem>
            <MenuItem value="Середньовіччя">Середньовіччя</MenuItem>
            <MenuItem value="Відродження і Реформація">
              Відродження і Реформація
            </MenuItem>
            <MenuItem value="Новий час">Новий час</MenuItem>
          </Select>

          <Typography sx={{ mt: 2 }}>Тип завдання:</Typography>
          <Select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          >
            <MenuItem value="Essay">Essay</MenuItem>
            <MenuItem value="Test">Test</MenuItem>
            <MenuItem value="Discussion">Discussion</MenuItem>
          </Select>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleStart}
            fullWidth
          >
            Start
          </Button>
        </Box>

        {loading ? (
          <CircularProgress sx={{ margin: "0 auto" }} />
        ) : showTask && task ? (
          <Box
            sx={{
              backgroundColor: "#fff",
              p: 4,
              borderRadius: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              {task.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }} color="textSecondary">
              Тема: {task.tag}
            </Typography>

            {task.type === "Essay" && (
              <>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {task.content?.question}
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={6}
                  placeholder="Write your answer here..."
                  value={essayAnswer}
                  onChange={(e) => setEssayAnswer(e.target.value)}
                />
              </>
            )}

            {task.type === "Test" &&
              (() => {
                const question = task.content?.questions?.[0];
                return (
                  <>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {question?.question}
                    </Typography>
                    <RadioGroup
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    >
                      {question?.options.map((opt: string, i: number) => (
                        <FormControlLabel
                          key={i}
                          value={opt}
                          control={<Radio />}
                          label={opt}
                        />
                      ))}
                    </RadioGroup>
                  </>
                );
              })()}

            {task.type === "Discussion" && (
              <>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {task.content?.prompt}
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={6}
                  placeholder="Write your answer here..."
                  value={essayAnswer}
                  onChange={(e) => setEssayAnswer(e.target.value)}
                />
              </>
            )}

            <Button
              onClick={handleSubmit}
              sx={{ mt: 3 }}
              variant="contained"
              fullWidth
            >
              Submit
            </Button>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default HomeComp;
