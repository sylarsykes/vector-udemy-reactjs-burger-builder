import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Register app
registerServiceWorker();
