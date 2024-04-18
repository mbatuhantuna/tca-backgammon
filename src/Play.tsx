import { useNavigate } from "react-router-dom";
import { GameResult } from "./GameResults";
import { FC, useEffect, useState } from "react";

interface PlayProps {
  addNewGameResult: (result: GameResult) => void;
  setTitle: (t: string) => void;
  chosenPlayers: string[];
}

export const Play: FC<PlayProps> = ({
  addNewGameResult,
  setTitle,
  chosenPlayers,
}) => {
  const [turnNumber, setTurnNumber] = useState(1);
  const [start, setStart] = useState(new Date().toISOString());

  useEffect(() => setTitle("Play Backgammon"), []);

  const nav = useNavigate();

  const [playerDoubles, setPlayerDoubles] = useState<[string, number][]>(chosenPlayers.map(x => [x, 0]));

  return (
    <div className="flex flex-col gap-3">
      {chosenPlayers.map((x) => (
        <div 
        key={x} 
        className="card bg-base-100 shadow-xl">
          <div 
          className="card-body p-3">
            <h2 
            className="card-title"
            >
              {x}
              </h2>
              <p
                className='text-primary'
              >
                Doubles
              </p>
              <div
                className="flex gap-3 items-center mb-5"
              >
            <button
                  className='btn btn-outline btn-sm btn-warning font-bold text-lg'
                  onClick={() => setPlayerDoubles(
                    playerDoubles.map(y => [
                      y[0],
                      y[0] === x ? Math.max(0, y[1] - 1) : y[1] 
                    ])
                  )}
                >
                  - 1
                </button>
                <h2
                  className='text-4xl font-bold mx-5 min-w-10 text-right'
                >
                  {
                    playerDoubles.find(y => y[0] === x)![1]
                  }
                </h2>
                <button
                  className='btn btn-outline btn-success btn-sm font-bold text-lg'
                  onClick={() => setPlayerDoubles(
                    playerDoubles.map(y => [
                      y[0]
                      , y[0] === x ? y[1] + 1 : y[1]
                    ])
                  )}
                >
                  + 1
                </button>
              </div>
         
          <p>local 
            other controls here
          </p>
            <button
              className="btn btn-outline btn-primary"
              onClick={() => {
                addNewGameResult({
                  winner: x,
                  players: chosenPlayers,
                  start: start,
                  end: new Date().toISOString(),
                });
                nav(-2);
              }}
            >
              {x} Won
            </button>
          </div>
        </div>
      ))}
      <p 
      className="text-xs"
      >Play the game and tap the app ! ! !
      </p>
    </div>
  );
};
