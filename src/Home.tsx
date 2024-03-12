import { useNavigate } from 'react-router-dom';
import { LeaderboardEntry } from './GameResults';
import { FC, useEffect } from 'react';

export const AppTitle = "Backgammon Companion App";

interface HomeProps {
    leaderboardData: LeaderboardEntry[];
    setTitle: (t: string) => void;
}

export const Home: FC<HomeProps> = ({ leaderboardData, setTitle }) => {

    useEffect(
        () => setTitle(AppTitle)
        , []
    );

    const nav = useNavigate();

    return (
        <div
            className='flex flex-col gap-3'
        >
            <button
                className="btn btn-lg btn-primary"
                onClick={() => nav('/setup')}
            >
                Play
            </button>
            <div
                className='card bg-base-100 shadow-xl'
            >
                <div
                    className='card-body p-3'
                >
                    <h2
                        className='card-title'
                    >
                        Leaderboard
                    </h2>
                    <table
                                className='table'
                            >
                                <tbody>
                                    {
                                           <><tr>
                                    <td> Total Games </td>
                                    <td> 10 </td>
                                </tr><tr>
                                        <td> Last Played </td>
                                        <td> 3d ago </td>
                                    </tr><tr>
                                        <td> Shortest Game </td>
                                        <td> 3m 41s </td>
                                    </tr><tr>
                                        <td> Longest Game </td>
                                        <td> 12m 24s </td>
                                    </tr></>
                                     
                                    }
                                </tbody>
                            </table>
                </div>
            </div>
            <div
                className='card bg-base-100 shadow-xl'
            >
                <div
                    className='card-body p-3'
                >
                    <h2
                        className='card-title'
                    >
                   General
                    </h2>
                    {
                        leaderboardData.length > 0
                        ? (
                            <table
                                className='table'
                            >
                                <thead>
                                    <tr>
                                        <th>W</th>
                                        <th>L</th>
                                        <th>AVG</th>
                                        <th>PLAYER</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        leaderboardData.map(lbe => (
                                            <tr
                                                key={lbe.name}
                                            >
                                                <td>{ lbe.wins }</td>
                                                <td>{ lbe.losses }</td>
                                                <td>{ lbe.avg.toFixed(3) }</td>
                                                <td>{ lbe.name }</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                        : (
                            <p>
                                Play a game to see the leaderboard!
                            </p>
                        )
                    }
                </div>
            </div>
        </div>
    );
};