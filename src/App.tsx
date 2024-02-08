import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

function App() {

  const router = createHashRouter([
    {
      path: "/",
      element: <h3>Home</h3>
    },
    {
      path: "/setup",
      element: <h3>Setup</h3>
    },
    {
      path: "/play",
      element: <h3>Play</h3>
    },
  ]);  


  return (      
    <div 
      className="App p-3"
    >
      <RouterProvider 
        router={router} 
      />
    </div>
  );
}
