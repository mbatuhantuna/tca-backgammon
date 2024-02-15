//
// Type definitions...
//

export type GameResult = {
    winner: string;
    players: string[];
};

export type LeaderboardEntry = {
    wins: number;
    losses: number;
    avg: number;
    name: string;
};

//
// Exported functions...
//

export const getPreviousPlayers = (results: GameResult[]) => {

    const previousPlayers = results.flatMap(
        x => x.players
    );

    return [
        ...new Set(previousPlayers)
    ].sort(
        (a, b) => a.localeCompare(b)
    );

};

export const getLeaderboard = (results: GameResult[]): LeaderboardEntry[] => {
    
    const players = getPreviousPlayers(results);
    
    return players.map(
        x => getLeaderboardEntryForPlayer(results, x)
    ).sort(
        // (a, b) => b.avg - a.avg

        // i-o-g
        (a, b) => (b.avg * 1000 + b.wins + b.losses) - (a.avg * 1000 + a.wins + a.losses)
    );
};


//
// Internal functions...
//

const getLeaderboardEntryForPlayer = (results: GameResult[], player: string): LeaderboardEntry => {

    const playerWins = results.filter(x => x.winner === player).length;
    const playerGames = results.filter(
        x => x.players.some(
            y => y === player
        )
    ).length;

    return {
        wins: playerWins
        , losses: playerGames - playerWins

        , avg: playerGames > 0
            ? playerWins / playerGames
            : 0
            
        , name: player
    };
};