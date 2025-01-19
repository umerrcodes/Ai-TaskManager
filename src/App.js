import React from 'react';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { TaskProvider } from './context/TaskContext';
import theme from './theme';
import TaskDashboard from './components/TaskDashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaskProvider>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <TaskDashboard />
        </Container>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App; 