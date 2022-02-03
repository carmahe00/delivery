import './App.css';
import { ThemeProvider } from '@mui/material';
import theme from './components/ui/theme';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <ThemeProvider theme={theme} >
        <AppRouter />  
    </ThemeProvider>
  );
}

export default App;
