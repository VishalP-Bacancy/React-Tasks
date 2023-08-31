import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UsersContext from './context/UsersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UsersContext>
       <App />
    </UsersContext>
  </React.StrictMode>
);

