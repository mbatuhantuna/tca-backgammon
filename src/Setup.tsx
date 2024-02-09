import { useNavigate } from 'react-router-dom';

export const Setup = () => {

    const nav = useNavigate();

    return (
        <>
            <h3>
                Setup
            </h3>
            <button
                className="btn btn-link"
                onClick={() => nav('/play')}
            >
                Start the Game
            </button>
        </>
    );
  };