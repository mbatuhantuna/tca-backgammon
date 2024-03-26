import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SetupProps {
    setTitle: (title: string) => void;
    previousPlayers:string[];
    setChosenPlayers: (players: string[]) => void;
};

export const Setup: FC<SetupProps> = ({ 
    setTitle
    ,previousPlayers
    , setChosenPlayers
 }) => {


    const [avaiblePlayers, setAvailablePlayers] = useState(previousPlayers.map( x =>({

        name: x
        , checked : false

    })));

    const [newPlayerName, setNewPlayerName] = useState("");

    useEffect(
        () => setTitle("Game Setup")
        , []
    );

    const nav = useNavigate();

    const validateAndAddNewPlayer = () => {

    if (
        newPlayerName.length > 0
        && !avaiblePlayers.some(x => x.name.toUpperCase()=== newPlayerName.toUpperCase())
    ) {

        setAvailablePlayers(
            [
            ...avaiblePlayers
            ,{
                name:newPlayerName
                ,checked:true
            }
        ].sort((a, b) => a.name.localeCompare(b.name))
        );

        setNewPlayerName("");

    }

       
    };


    return (
        <div
            className='flex flex-col gap-3'
        >
            <button
                className="btn btn-lg btn-primary"
                onClick={
                    () =>{
                        setChosenPlayers(
                            avaiblePlayers
                            .filter(x => x.checked)
                            .map(x => x.name)
                        );
                     nav('/play');
                }
            }
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
                <div
                className='flex mb-5'
                >
                <input 
                type="text" 
                placeholder="Enter New Player" 
                className="input input-bordered w-full max-w-xs" 
                value={newPlayerName}
                onChange={(e)=> setNewPlayerName(e.target.value)}
                />
                <button
              className="btn btn-accent ml-3"
              onClick={validateAndAddNewPlayer}
                >
                    Add
                </button>
                </div>
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
                        className="checkbox checkbox-primary mb-5"
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