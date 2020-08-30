import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Root from './Root';
import {
  BrowserRouter as Router
} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#fff',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    }
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Root>
      <Router>
        <App />
      </Router>
    </Root>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
