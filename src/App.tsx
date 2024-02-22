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

  // Uncomment this line to see app running without any game results...
  // const [gameResults, setGameResults] = useState<GameResult[]>([]);
  
  const [gameResults, setGameResults] = useState<GameResult[]>(dummyGameResults);

  const [title, setTitle] = useState("Backgammon Companion App");

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
      className="App"
    >
      <div
        className='navbar bg-base-300'
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
</svg>

        <span
          className='text-lg font-bold ml-3'
        >
          { title }
        </span>
      </div>
      <div
        className='p-3'
      >
        <RouterProvider 
          router={router} 
        />
      </div>
    </div>
  );
}

export default App;