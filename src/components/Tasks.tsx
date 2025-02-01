import { useDraggable } from '@dnd-kit/core';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
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

export default DraggableTask;
