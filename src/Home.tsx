import { useNavigate } from 'react-router-dom';
import { LeaderboardEntry } from './GameResults';
import { FC } from 'react';

interface HomeProps {
    leaderboardData: LeaderboardEntry[];
}

export const Home: FC<HomeProps> = ({ leaderboardData }) => {

    console.log(leaderboardData);

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
            <div
            className='card mt -3 bg-base-100 shadow-xl'
            >
                <div 
                className='card-body'
                >
                <h2 
                className='card-title'
                >
                    Leaderboard 
                </h2>
                </div>
            </div>
        </>
    );
};