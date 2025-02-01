import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useTaskStore } from '../store';
import { useDroppable, useDraggable } from '@dnd-kit/core';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface StatusSectionProps {
  status: string;
  tasks: Task[];
}

// Draggable Task Component
const DraggableTask: React.FC<{ task: Task }> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Link
        to={`/task/${task.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Card
          variant='outlined'
          sx={{
            width: '100%',
            maxWidth: '300px',
            cursor: 'grab',
            '&:active': {
              cursor: 'grabbing',
            },
          }}
        >
          <CardActionArea
            sx={{
              height: '100%',
              width: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardContent>
              <Typography variant='h6' component='div'>
                {task.title}
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  WebkitLineClamp: 1,
                }}
              >
                {task.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
};

const StatusSection: React.FC<StatusSectionProps> = ({ status, tasks }) => {
  const addTask = useTaskStore((state) => state.addTask);
  const navigate = useNavigate();

  const { setNodeRef } = useDroppable({
    id: status,
  });

  const handleAddTask = () => {
    const newTask = {
      id: Date.now().toString(),
      title: `New Task`,
      description: `Description for ${status}`,
      status: status,
    };
    addTask(newTask);
    navigate(`/task/${newTask.id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Not Started':
        return 'rgba(255, 68, 58, 0.6)';
      case 'In Progress':
        return 'rgba(52, 199, 89, 0.53)';
      case 'Completed':
        return 'rgba(0, 123, 255, 0.51)';
      default:
        return 'rgba(200, 200, 200, 0.8)';
    }
  };

  return (
    <Box
      ref={setNodeRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: { xs: '100%', sm: '100%', lg: '250px' },

        gap: 2,
        p: 2,
        boxSizing: 'border-box',
        minHeight: '200px', // Add minimum height for empty columns

        borderRadius: 1,
      }}
    >
      <Typography
        variant='h6'
        sx={{
          fontSize: { xs: '1rem', sm: '1.25rem' },
          textAlign: 'center',
        }}
      >
        <Box
          component='span'
          sx={{
            backgroundColor: getStatusColor(status),
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            color: 'black',
            display: 'inline-block',
          }}
        >
          {status}
        </Box>{' '}
        {tasks.length}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
        }}
      >
        {tasks.map((task) => (
          <DraggableTask key={task.id} task={task} />
        ))}
        <Button variant='text' startIcon={<AddIcon />} onClick={handleAddTask}>
          New
        </Button>
      </Box>
    </Box>
  );
};

export default StatusSection;
