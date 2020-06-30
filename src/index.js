import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from '../config/i18next';
import App from './containers';
import { SpinnerFC } from './components/functional-components';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <Suspense fallback={(<SpinnerFC />)}>
        <App useSuspense={true} />
      </Suspense>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Register app
registerServiceWorker();
