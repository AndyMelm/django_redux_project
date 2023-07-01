import React from 'react';
import { Outlet } from 'react-router';
import './App.css';
import Navbar from './features/navbar/Navbar';

function App() {
  return (
    <div className="App">
    <Navbar></Navbar>
      <Outlet />
    </div>
  );
}

export default App;
