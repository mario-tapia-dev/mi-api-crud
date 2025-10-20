// Importamos las herramientas que necesitamos
import express from 'express';
import { PrismaClient } from '@prisma/client';

// Inicializamos las aplicaciones
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// --- ENDPOINTS PARA LAS TAREAS (TASKS) ---

// 1. OBTENER TODAS LAS TAREAS (GET)
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener las tareas.' });
  }
});

// 2. CREAR UNA NUEVA TAREA (POST)
app.post('/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    // Simple validación para asegurarse de que el título no esté vacío
    if (!title) {
      // Si el título no viene, responde con un error y termina.
      return res.status(400).json({ error: 'El título es obligatorio.' });
    }
    const newTask = await prisma.task.create({
      data: { title },
    });
    // Si todo sale bien, responde con la nueva tarea y termina.
    res.status(201).json(newTask);
  } catch (error) {
    // Si hay un error en la base de datos, responde con un error y termina.
    res.status(500).json({ error: 'Hubo un error al crear la tarea.' });
  }
});

// 3. OBTENER UNA TAREA POR SU ID (GET)
app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await prisma.task.findUnique({
            where: { id: parseInt(id) },
        });
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada.' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener la tarea.' });
    }
});

// 4. ACTUALIZAR UNA TAREA (PUT)
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, isCompleted } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title,
        isCompleted,
      },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al actualizar la tarea. Asegúrate de que el ID existe.' });
  }
});

// 5. ELIMINAR UNA TAREA (DELETE)
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al eliminar la tarea. Asegúrate de que el ID existe.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});