import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Featured from './pages/Featured';
import Workspace from './pages/Workspace';
import Editor from './pages/Editor';
import { store } from './redux/store';
import LoaderBackdrop from './components/LoaderBackdrop';
import colors from './constants/colors';

let theme = createTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
  palette: {
    primary: {
      main: colors.main,
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
  {
    path: '/workspace',
    element: <Workspace />,
  },
  {
    path: '/workspace/:workspaceId',
    element: <Editor />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router}></RouterProvider>
          <LoaderBackdrop />
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
