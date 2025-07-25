import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './textures.css'
import './mobile-fix.css' // Nuclear option for mobile overlay fix
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
