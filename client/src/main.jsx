import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { persistor,Store } from './redux/Store.js'
import { Provider } from 'react-redux';
import './index.css'
import { PersistGate } from 'redux-persist/integration/react';
createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
  <PersistGate loading={null} persistor={persistor}>
  <App />
  </PersistGate>
</Provider>
)
