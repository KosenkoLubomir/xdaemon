import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <main className="min-h-screen bg-gray-50">
          <App />
          <Toaster position="top-right" />
      </main>
  </React.StrictMode>
);
