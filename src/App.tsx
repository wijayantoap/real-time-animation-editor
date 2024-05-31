import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Featured from './pages/Featured';

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

const client = new ApolloClient({
  uri: 'https://graphql.lottiefiles.com/2022-08',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/featured',
    element: <Featured />,
  },
]);

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
