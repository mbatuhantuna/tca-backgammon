import { useNavigate } from 'react-router-dom';
import { GeneralFacts, LeaderboardEntry } from './GameResults';
import { FC, useEffect, useState } from 'react';
import PieChart from "./PieChart"

export const AppTitle = "Backgammon Companion App";


interface HomeProps {
    leaderboardData: LeaderboardEntry[];
    setTitle: (t: string) => void;
    generalFacts:GeneralFacts;
    avgGameDurationsByPlayerCount: {
        numberOfPlayers: number;
        avgGameDuration: any;
    }[];
}




export const Home: FC<HomeProps> = ({ 
    leaderboardData 
    ,setTitle
    ,generalFacts
    , avgGameDurationsByPlayerCount
 }) => {

    const [playerForChart, setPlayerForChart] = useState("");
    console.log(avgGameDurationsByPlayerCount);
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
                        General
                    </h2>
                    <table
                                className='table'
                            >
                                <tbody>
                                    {
                                           <><tr>
                                    <td> Total Games </td>
                                    <td> {generalFacts.totalGames} </td>
                                </tr><tr>
                                        <td> Last Played </td>
                                        <td> {generalFacts.lastPlayed} </td>
                                    </tr><tr>
                                        <td> Shortest Game </td>
                                        <td> {generalFacts.shortestGame} </td>
                                    </tr><tr>
                                        <td> Longest Game </td>
                                        <td> {generalFacts.longestGame} </td>
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
                   Leaderboard
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
                                        <th>AVG PLAYER DOUBLE</th>
                                        <th></th>
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
                                                <td>{ lbe.abgPlayerDoubles }</td>
                                                <td>
                                                    <button 
                                                        className="btn btn-link"
                                                        onClick={() => setPlayerForChart(lbe.name)}
                                                    >
                                                        Chart
                                                    </button>
                                                </td>
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
            
            <div
                className='card bg-base-100 shadow-xl'
            >
                <div
                    className='card-body p-3'
                >
                    <h2
                        className='card-title'
                    >
                   Avg Game Time
                    </h2>
                    {
                        avgGameDurationsByPlayerCount.length > 0
                        ? (
                            <table
                                className='table'
                            >
                                <thead>
                                    <tr>
                                        <th># PLAYERS</th>
                                        <th>AVG DURATION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        avgGameDurationsByPlayerCount.map(agdbpc => (
                                            <tr
                                                key={agdbpc.numberOfPlayers}
                                            >
                                                <td>{ agdbpc.numberOfPlayers }</td>
                                                <td>{ agdbpc.avgGameDuration }</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                        : (
                            <p>
                                Play a game to see the average game times!
                            </p>
                            
                        )
                    }
                </div>

      
<div 
className=
'card bg-base-100 shadow-xl'
>
    <div 
    className='card-body p-3'
    >
       
        <h2 
        className='card-title'
        >
            Chart Explanation
        </h2>
        <h1
            className='card-title mt- flex justify-center items-center h-full w-full'
        >
               { playerForChart }
        </h1>
    </div>

    <div 
    className=
    'card-title mt-4 flex justify-center items-center h-full w-full'
    >
        <PieChart />
    </div>
</div>

















      
            </div>

       
            
            {/* <div
                className='card bg-base-100 shadow-xl'
            >
                <div
                    className='card-body p-3'
                >
                    <h2
                        className='card-title'
                    >
                   Avg Player Doubles
                    </h2>
                    {
                        avgGameDurationsByPlayerCount.length > 0
                        ? (
                            <table
                                className='table'
                            >
                                <thead>
                                    <tr>
                                        <th># PLAYERS</th>
                                        <th>AVG DURATION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        avgGameDurationsByPlayerCount.map(agdbpc => (
                                            <tr
                                                key={agdbpc.numberOfPlayers}
                                            >
                                                <td>{ agdbpc.numberOfPlayers }</td>
                                                <td>{ agdbpc.avgGameDuration }</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                        : (
                            <p>
                                Play a game to see the average game times!
                            </p>
                            
                        )
                    }
                </div>
            </div> */}


        </div>
        
        
    );
};