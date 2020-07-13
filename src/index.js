import React, { StrictMode, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from '../config/i18next';
import App from './containers';
import { SpinnerFC } from './components/functional-components';
import BurgerBuilderReactReduxProvider from './store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <StrictMode>
    <BurgerBuilderReactReduxProvider>
      <I18nextProvider i18n={ i18next }>
        <Suspense fallback={ (<SpinnerFC />) }>
          <BrowserRouter>
            <App useSuspense={ true } />
          </BrowserRouter>
        </Suspense>
      </I18nextProvider>
    </BurgerBuilderReactReduxProvider>
  </StrictMode>,
  document.getElementById('root')
);

// Register app
registerServiceWorker();
