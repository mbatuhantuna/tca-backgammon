import { useNavigate } from 'react-router-dom';

export const Play = () => {
    const nav = useNavigate();

    return (
      <>
        <h3>
          Play
        </h3>
        <p>
          Play the game and tap the app ! ! !
        </p>
        <button
            className="btn btn-outline btn-primary"
            onClick={() => true ? nav(-2) : nav('/home')}
        >
            Done
        </button>
      </>
    );
  };