import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ProviderLayer } from './app/Providers/ProviderLayer';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: "AIzaSyBuL3v0HQPYjwwPOtbDanL8fxVv1g_K3bY",
  authDomain: "auto-meal-planner-ct.firebaseapp.com",
  projectId: "auto-meal-planner-ct",
  storageBucket: "auto-meal-planner-ct.appspot.com",
  messagingSenderId: "1048404490440",
  appId: "1:1048404490440:web:c74e3f2ba1c08a784a0dfd"
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <BrowserRouter>
        <ProviderLayer />
      </BrowserRouter>
  </FirebaseAppProvider>
    
  </React.StrictMode>
);
reportWebVitals();
