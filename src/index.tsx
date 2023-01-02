import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRouter from './routes/router';
import AppTheme from './themes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(AppRouter);

root.render(
  <React.StrictMode>
    { /* Créer des thèmes customs */}
    <ThemeProvider theme={AppTheme}> 
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
