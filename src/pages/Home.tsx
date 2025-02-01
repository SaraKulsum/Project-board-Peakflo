import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useTaskStore } from '../store';
import StatusSection from '../components/StatusSection';
import {
  DndContext,
  DragEndEvent,
  useSensors,
  useSensor,
  PointerSensor,
} from '@dnd-kit/core';
import DashboardIcon from '@mui/icons-material/Dashboard';
const Home: React.FC = () => {
  const defaultStatuses = ['Not Started', 'In Progress', 'Completed'];
  const taskList = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  // to handle and update status of task on Drag-end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTaskId = active.id;
    const overStatus = over.id;

    // Find the task and update its status
    const task = taskList.find((t) => t.id === activeTaskId);
    if (task && task.status !== overStatus) {
      updateTask({
        ...task,
        status: overStatus as string,
      });
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant='h1'
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            textAlign: 'center',
            margin: '15px 0',
            display: 'flex',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          PROJECT BOARD <DashboardIcon />
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }}>
          {defaultStatuses.map((status, index) => {
            const filteredTasks = taskList.filter(
              (item) => item.status === status
            );
            return (
              <StatusSection
                key={`${status}_${index}`}
                status={status}
                tasks={filteredTasks}
              />
            );
          })}
        </Stack>
      </Box>
    </DndContext>
  );
};

export default Home;
