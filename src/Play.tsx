import { useNavigate } from 'react-router-dom';
import { GameResult } from './GameResults';
import { FC, useEffect, useState } from 'react';

interface PlayProps {
  addNewGameResult: (result: GameResult) => void;
  setTitle: (t: string) => void;
  chosenPlayers:string[];
}

export const Play: FC<PlayProps> = ({ 
  addNewGameResult
  , setTitle
 , chosenPlayers
}) => {


  const [turnNumber, setTurnNumber] = useState(1);
  const [start, setStart] = useState(new Date().toISOString());

    useEffect(
      () => setTitle("Play Backgammon")
      , []
    );

    const nav = useNavigate();

    //Local function 
  const gameOver = (winner: string) => {
      addNewGameResult({
        winner: winner
        , players: chosenPlayers
        , start: start
        , end: new Date().toISOString()
      });
      nav(-2);
    };


    return (
      <div
        className='flex flex-col gap-3'
      >
        {
        chosenPlayers.map(x => (
          <button
           key ={x}
                  className="btn btn-lg btn-primary"
                  onClick={() => gameOver(x)}
              >
                  {x} Won
              </button>
        ))
                }
        <p
          className='text-xs'
        >
          Play the game and tap the app ! ! !
        </p>   
        <p>
        Current Doubles: {turnNumber}
        </p>
        <button
          className='btn btn-link'
          onClick={() => setTurnNumber(turnNumber + 1)}
        >
          Next Double
        </button>     
      </div>
    );
  };