import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './features/login/Login';
import Register from './features/register/Register';
import HomePage from './features/homepage/HomePage';
import Journal from './features/journal/Journal';
import JournalData from './features/showdata/Showdata';
import Tradingview from './features/tradingview/Tradingview';
import Navbar from './features/navbar/Navbar'; // Import the Navbar component

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar /> {/* Add the Navbar component outside the Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journaldata" element={<JournalData />} />
          <Route path="/marketdata" element={<Tradingview />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
