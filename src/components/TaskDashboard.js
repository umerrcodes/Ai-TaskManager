import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import { useTaskContext } from '../context/TaskContext';

function TaskDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useTaskContext();

  const filteredTasks = state.tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        AI Task Manager
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
          <TaskList tasks={filteredTasks} />
        </Grid>
        <Grid item xs={12} md={4}>
          <AddTaskForm />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TaskDashboard; 