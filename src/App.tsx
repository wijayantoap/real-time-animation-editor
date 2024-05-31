import './App.css';
import Header from './components/Header';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';

let theme = createTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
  palette: {
    primary: {
      main: '#009D91',
    },
    secondary: {
      main: '#FFD700', // A vibrant secondary color
    },
    background: {
      default: '#FFFFFF', // White background
      paper: '#F5F5F5', // Light gray paper background
    },
    text: {
      primary: '#333333', // Dark text color
      secondary: '#666666', // Light text color
    },
    error: {
      main: '#FF1744', // Error/red color
    },
    success: {
      main: '#4CAF50', // Success/green color
    },
    warning: {
      main: '#FFC107', // Warning/yellow color
    },
    info: {
      main: '#2196F3', // Info/blue color
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Home />
    </ThemeProvider>
  );
}

export default App;
