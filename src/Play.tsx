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
          <p>
            other controls here
          </p>
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
      <p>
        Current Doubles: {turnNumber}
        </p>
      <button
        className="btn btn-link"
        onClick={() => setTurnNumber(turnNumber + 1)}
      >
        Next Double
      </button>
    </div>
  );
};
