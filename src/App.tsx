import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import TaskDetailsPage from './pages/Details';
import { useTaskStore } from './store';

const initialTasks = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Task 1 description',
    status: 'Not Started',
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Task 2 description',
    status: 'In Progress',
  },
  {
    id: '3',
    title: 'Task 3',
    description: 'Task 3 description',
    status: 'Completed',
  },
];

function App() {
  const setTasks = useTaskStore((state) => state.setTasks);
  const tasks = useTaskStore((state) => state.tasks);

  // Only set initial tasks if there are none
  useEffect(() => {
    if (tasks.length === 0) {
      setTasks(initialTasks);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/task/:id' element={<TaskDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
