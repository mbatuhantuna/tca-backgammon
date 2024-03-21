import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SetupProps {
    setTitle: (t: string) => void;
    previousPlayers:string[];
};

export const Setup: FC<SetupProps> = ({ 
    setTitle
    ,previousPlayers
 }) => {


    const [avaiblePlayers, setAvailablePlayers] = useState(previousPlayers.map( x =>({

        name: x
        , checked : false

    })));

    useEffect(
        () => setTitle("Game Setup")
        , []
    );

    const nav = useNavigate();

    return (
        <div
            className='flex flex-col gap-3'
        >
            <button
                className="btn btn-lg btn-primary"
                onClick={() => nav('/play')}
                disabled={avaiblePlayers.filter(x => x.checked).length != 2}
            >
                Start the Game
            </button>
            <div
            className='card bg-base-100 shadow-xl'
            >
            <div
            className='card-boy p-3'
            >
                {
                    avaiblePlayers.map(x => (
                    <div 
                    className="form-control"
                    key={x.name}
                    >
                    <label 
                    className="flex cursor-pointer"
                    
                    >
                        <input 
                        type="checkbox" 
                        className="checkbox checkbox-primary"
                        checked = {x.checked}
                        onChange={() => setAvailablePlayers([
                            ...avaiblePlayers.map(y => ({
                                name: y.name,
                                checked:y.name === x.name
                                ? !y.checked
                                : y.checked
                            }))
                        ])}
                         />
                        <span
                              className="label-text ml-3"
                        >
                        {x.name}
                         </span> 
                    </label>
                    </div>
                    ))
                }

                </div>
            </div>
        </div>
    );
  };