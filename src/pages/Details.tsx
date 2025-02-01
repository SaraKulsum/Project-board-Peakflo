import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useTaskStore } from '../store';

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Zustand store functions
  const taskList = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  // State to hold the current task being edited
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const currentTask = taskList.find((task) => task.id === id);
      if (currentTask) {
        setTask(currentTask);
      }
    }
  }, [id, taskList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setTask((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleSave = () => {
    if (task) {
      updateTask(task); // Save the updated task
      navigate('/'); // Redirect to the home page after saving
    }
  };

  const handleDelete = () => {
    if (task) {
      deleteTask(task.id); // Delete the task
      navigate('/'); // Redirect to the home page after deletion
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2>Edit Task</h2>
      <TextField
        label='Title'
        name='title'
        value={task.title}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label='Description'
        name='description'
        value={task.description}
        onChange={handleChange}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Age</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          name='status'
          value={task.status}
          label='Status'
          onChange={handleSelectChange}
        >
          <MenuItem value='Not Started'>Not Started</MenuItem>
          <MenuItem value='In Progress'>In Progress</MenuItem>
          <MenuItem value='Completed'>Completed</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <Button onClick={handleSave}>Save</Button>
        <Button color='error' onClick={handleDelete}>
          Delete Task
        </Button>
      </Box>
    </Box>
  );
};

export default TaskDetailsPage;
