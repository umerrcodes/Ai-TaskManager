import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Typography,
  Paper,
} from '@mui/material';
import { useTaskContext } from '../context/TaskContext';
import { getAISuggestions } from '../services/aiService';

function AddTaskForm() {
  const { state, dispatch } = useTaskContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Work',
    deadline: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const aiSuggestions = await getAISuggestions(formData.description);
      
      const newTask = {
        id: Date.now(),
        ...formData,
        ...aiSuggestions,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      dispatch({ type: 'ADD_TASK', payload: newTask });
      setFormData({
        title: '',
        description: '',
        category: 'Work',
        deadline: '',
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to get AI suggestions' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New Task
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          margin="normal"
        >
          {state.categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          type="date"
          label="Deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Add Task'
          )}
        </Button>
      </Box>
    </Paper>
  );
}

export default AddTaskForm; 