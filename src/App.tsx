import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { GameResult, getLeaderboard } from './GameResults';

const dummyGameResults: GameResult[] = [
  {
      winner: "Tom"
      , players: [
          "Tom"
          , "Batu"
          , "Julia"
          , "Melisa"
          , "John"
      ]
  }
  , {
      winner: "John"
      , players: [
          "Batu"
          , "Julia"
          , "Melisa"
          , "John"
      ]
  }
  , {
      winner: "John"
      , players: [
          "Tom"
          , "Batu"
          , "Julia"
          , "Melisa"
          , "John"
      ]
  }    
  , {
      winner: "Harry"
      , players: [
          "Harry"
          , "hermione"
          , "Ron"
      ]
  }
];

const App = () => {

  const [gameResults, setGameResults] = useState<GameResult[]>(dummyGameResults);

  const addNewGameResult = (result: GameResult) => setGameResults(
    [
      ...gameResults
      , result
    ]
  );

  const router = createHashRouter([
    {
      path: "/",
      element: <Home
        leaderboardData={getLeaderboard(gameResults)}
      />
    },
    {
      path: "/setup",
      element: <Setup />
    },
    {
      path: "/play",
      element: <Play 
          addNewGameResult={addNewGameResult}
        />
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

export default App;