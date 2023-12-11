import React from 'react';
import ReactDOM from 'react-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { AppContext, AppContextProvider } from './Context/AppContext';

ReactDOM.render(
  <AppContextProvider>
    <App />,
  </AppContextProvider>
  document.getElementById('root'),
);
