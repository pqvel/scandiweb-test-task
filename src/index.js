import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app/App';
import store, { persistor } from './core/redux/store/store';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>  
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
