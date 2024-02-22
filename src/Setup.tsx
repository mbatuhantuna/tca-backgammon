import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SetupProps {
    setTitle: (t: string) => void;
};

export const Setup: FC<SetupProps> = ({ setTitle }) => {

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
            >
                Start the Game
            </button>
        </div>
    );
  };