import React, { useEffect, useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

import { createHashRouter, RouterProvider } from "react-router-dom";

import { Home, AppTitle } from "./Home";
import { Setup } from "./Setup";
import { Play } from "./Play";
import { GameResult
  , getLeaderboard
  , getGeneralFacts
  , getPreviousPlayers
  , getAverageGameDurationsByPlayerCount
} from "./GameResults";
import { loadGamesFromCloud, saveGameToCloud } from "./tca-cloud-api";
import localforage from "localforage";




const App = () => {
  // Uncomment this line to see app running without any game results...
  // const [gameResults, setGameResults] = useState<GameResult[]>([]);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [gameResults, setGameResults] = useState<GameResult[]>([]);

  const [title, setTitle] = useState(AppTitle);


  const [chosenPlayers, setChosenPlayers] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const [dialogEmail, setDialogEmail] = useState("");
  const [cloudApiEmail, setCloudApiEmail] = useState("");


  useEffect(
    () => {
      const init = async () => {

        if (!ignore) {

          const savedEmail = await localforage.getItem<string>("email") ?? "";

          if (savedEmail.length > 0) {

            setCloudApiEmail(savedEmail);
            setDialogEmail(savedEmail);

            const cloudGameResults = await loadGamesFromCloud(
              savedEmail
              , "tca-backgammon-24s"
            );

            setGameResults(cloudGameResults);
          }
          else {
            dialogRef.current?.showModal()
          }
        }
      };

      let ignore = false;
      init();

      return () => {
        ignore = true;
      };
    }
    , [cloudApiEmail]

  );
  
  const addNewGameResult = async (result: GameResult) =>{

    // Save the game result to the cloud.

    await saveGameToCloud(
      cloudApiEmail
      , "tca-backgammon-24s"
      ,result.end
      ,result

    )

    // Optimistically update the lifted state with new game result.

    setGameResults(
      [...gameResults
      , result
      ]
      );
  };
    

  const router = createHashRouter([
    {
      path: "/",
      element: (
        <Home
          leaderboardData={getLeaderboard(gameResults)}
          generalFacts ={getGeneralFacts(gameResults)}
          setTitle={setTitle}
          avgGameDurationsByPlayerCount={getAverageGameDurationsByPlayerCount(gameResults)}
        />
      ),
    },
    {
      path: "/setup",
      element: <Setup setTitle={setTitle} 
      previousPlayers = {getPreviousPlayers(gameResults)} 
      setChosenPlayers = {setChosenPlayers}
      />,
    },
    {
      path: "/play",
      element: <Play 
      addNewGameResult={addNewGameResult} 
      setTitle={setTitle} 
      chosenPlayers={chosenPlayers}      
      />,
    },
  ]);

  return (




    <div className="App"
    data-theme={darkMode ? "dark" : "light"}
    >



      <div className="navbar bg-base-300">
        {title === AppTitle && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
            />
          </svg>
        )}
        <span className="text-lg font-bold ml-3">{title}</span>
        <div
          className='ml-auto mr-4'
        >
          <button
          className='mr-2'
          onClick={()=>dialogRef.current?.showModal()}
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
          </svg>
          </button>
          <label className="swap swap-rotate">

            {/* this hidden checkbox controls the state */}
            <input 
              type="checkbox" 
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)} 
            />

            {/* sun icon */}
            <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

            {/* moon icon */}
            <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

          </label>
        </div>
      </div>
      <div className="p-3 min-h-screen">
        <RouterProvider router={router} />
      </div>
        <dialog 
        ref={dialogRef}
        id="email-dialog" 
        className="modal modal-bottom sm:modal-middle"
        >
      <div 
      className="modal-box"
      >
        <h3 
        className="font-bold text-lg"
        >Please enter email address for saving game results.
        </h3>
        <input
            type="text"
            placeholder="Email Address"
            className="input input-bordered w-full mt-3"
            value={dialogEmail}
            onChange={(e) => setDialogEmail(e.target.value)}
          />
        <div 
        className="modal-action"
        >
          <form 
          method="dialog"
          >
            {/* if there is a button in form, it will close the modal */}
            <button 
            className="btn btn-primary"
            onClick={async () => {
              await localforage.setItem<string>("email", dialogEmail);
              setCloudApiEmail(dialogEmail);
            }}
            >Done
            </button>
          </form>
        </div>
      </div>
    </dialog>
    </div>
    
    
  );
};

export default App;
