"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { Todo } from "@/types/todo";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/todos";

const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("No se pudieron cargar las tareas");
  return response.json();
};

const createTodo = async (
  todo: Pick<Todo, "title" | "description">,
): Promise<Todo> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) throw new Error("No se pudo crear la tarea");
  return response.json();
};

const updateTodo = async (id: number, todo: Partial<Todo>): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) throw new Error("No se pudo actualizar la tarea");
  return response.json();
};

const deleteTodo = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("No se pudo eliminar la tarea");
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadTodos = async () => {
    const data = await fetchTodos();
    setTodos(data);
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      const data = await fetchTodos();
      if (mounted) setTodos(data);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) return;

    await createTodo({
      title,
      description,
    });

    setTitle("");
    setDescription("");

    loadTodos();
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    loadTodos();
  };

  const handleToggle = async (todo: Todo) => {
    await updateTodo(todo.id, {
      completed: !todo.completed,
    });

    loadTodos();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Todo App
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
        <TextField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Descripción"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button variant="contained" onClick={handleCreate}>
          Crear tarea
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {todos.map((todo) => (
          <Card key={todo.id}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h6">{todo.title}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    {todo.description}
                  </Typography>

                  <Typography
                    variant="caption"
                    color={todo.completed ? "green" : "orange"}
                  >
                    {todo.completed ? "Completada" : "Pendiente"}
                  </Typography>
                </Box>

                <Box>
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleToggle(todo)}
                  />

                  <IconButton
                    color="error"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Eliminar
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
