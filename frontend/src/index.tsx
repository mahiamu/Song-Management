
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

ReactDOM.render(
 
  <Provider store={store}>
     <ThemeProvider theme={theme}>
       <CssBaseline />
         <App />
     </ThemeProvider>,
  </Provider>,
 
  document.getElementById('root')
);
