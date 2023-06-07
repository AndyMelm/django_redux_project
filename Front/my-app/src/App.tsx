import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Login from './features/login/Login';
import Register from './features/register/Register';
import HomePage from './features/homepage/HomePage';
import { Outlet } from 'react-router';


function App() {
  return (
    <div className="App">
      <HomePage></HomePage>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
