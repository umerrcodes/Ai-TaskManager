import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Box,
  Typography,
  Checkbox,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTaskContext } from '../context/TaskContext';

function TaskList({ tasks }) {
  const { dispatch } = useTaskContext();

  const handleToggleComplete = (task) => {
    dispatch({
      type: 'UPDATE_TASK',
      payload: { ...task, completed: !task.completed },
    });
  };

  const handleDelete = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  if (tasks.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary" align="center">
        No tasks found
      </Typography>
    );
  }

  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          sx={{
            bgcolor: 'background.paper',
            mb: 1,
            borderRadius: 1,
            boxShadow: 1,
          }}
          secondaryAction={
            <IconButton edge="end" onClick={() => handleDelete(task.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <Checkbox
            checked={task.completed}
            onChange={() => handleToggleComplete(task)}
          />
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  sx={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                >
                  {task.title}
                </Typography>
                <Chip
                  size="small"
                  label={task.priority}
                  color={getPriorityColor(task.priority)}
                />
                <Chip size="small" label={task.category} />
              </Box>
            }
            secondary={
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Estimated time: {task.estimatedHours}h | Due: {task.deadline}
                </Typography>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList; 