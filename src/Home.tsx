import { useNavigate } from 'react-router-dom';

export const Home = () => {

    const nav = useNavigate();

    return (
        <>
            <h3>
                Home
            </h3>
            <button
                className="btn btn-secondary"
                onClick={() => nav('/setup')}
            >
                Play
            </button>
        </>
    );
};