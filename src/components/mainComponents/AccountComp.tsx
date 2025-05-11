import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material";

type TaskStatus = "Completed" | "In Progress" | "Failed";
type TaskType = "Test" | "Article" | "LongAnswer";
type HistoryTag =
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
  status: TaskStatus;
  createdAt: string;
  tag: HistoryTag;
};

const mapTypeToUkrainian = (type: TaskType) => {
  switch (type) {
    case "Test":
      return "Тест";
    case "Article":
      return "Стаття";
    case "LongAnswer":
      return "Розгорнута відповідь";
    default:
      return type;
  }
};

const AccountComp = () => {
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get<Task[]>("http://localhost:3000/tasks");
        setUserTasks(res.data);
      } catch (error) {
        console.error("Помилка при завантаженні завдань:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const completedTasks = useMemo(
    () => userTasks.filter((t) => t.status === "Completed"),
    [userTasks]
  );

  const inProgressTasks = useMemo(
    () => userTasks.filter((t) => t.status === "In Progress"),
    [userTasks]
  );

  const failedTasks = useMemo(
    () => userTasks.filter((t) => t.status === "Failed"),
    [userTasks]
  );

  const statsByTag = useMemo(() => {
    const initialCounts: Record<HistoryTag, number> = {
      "Первісне суспільство": 0,
      "Стародавній Схід": 0,
      Античність: 0,
      Середньовіччя: 0,
      "Відродження і Реформація": 0,
      "Новий час": 0,
    };

    completedTasks.forEach((task) => {
      initialCounts[task.tag]++;
    });

    return initialCounts;
  }, [completedTasks]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const renderTaskCard = (
    task: Task,
    chipLabel: string,
    chipColor?: "default" | "error" | "warning"
  ) => (
    <Card key={task.id} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {task.title}
          <Chip
            label={chipLabel}
            size="small"
            color={chipColor}
            sx={{ ml: 1 }}
          />
        </Typography>
        <Typography variant="body2">
          Тип: <Chip label={mapTypeToUkrainian(task.type)} size="small" />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Тема: {task.tag}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Створено: {new Date(task.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        py: 6,
        px: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 1000,
          width: "100%",
          p: 4,
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
          Особистий кабінет
        </Typography>

        <Typography variant="h6" mb={2}>
          Статистика за темами:
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
          {Object.entries(statsByTag).map(([tag, count]) => (
            <Box
              key={tag}
              sx={{ flex: "1 1 calc(33.333% - 16px)", minWidth: "200px" }}
            >
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 2,
                  textAlign: "center",
                  backgroundColor: "#f1f5fb",
                }}
              >
                <Typography fontWeight="medium">{tag}</Typography>
                <Typography fontSize="1.2rem" fontWeight="bold">
                  {count}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" mb={2}>
          Завдання, які ви виконали:
        </Typography>
        <Box display="flex" flexDirection="column" gap={2} mb={4}>
          {completedTasks.length > 0 ? (
            completedTasks.map((task) =>
              renderTaskCard(task, "Виконано", "default")
            )
          ) : (
            <Typography color="text.secondary">
              Немає виконаних завдань.
            </Typography>
          )}
        </Box>

        <Typography variant="h6" mb={2}>
          Завдання, які ви розпочали:
        </Typography>
        <Box display="flex" flexDirection="column" gap={2} mb={4}>
          {inProgressTasks.length > 0 ? (
            inProgressTasks.map((task) =>
              renderTaskCard(task, "У процесі", "warning")
            )
          ) : (
            <Typography color="text.secondary">
              Немає активних завдань.
            </Typography>
          )}
        </Box>

        <Typography variant="h6" mb={2}>
          Завдання, які не вдалося виконати:
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {failedTasks.length > 0 ? (
            failedTasks.map((task) =>
              renderTaskCard(task, "Не виконано", "error")
            )
          ) : (
            <Typography color="text.secondary">
              Немає невдалих завдань.
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AccountComp;
