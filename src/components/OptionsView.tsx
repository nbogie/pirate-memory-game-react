import { useState } from 'react';
import { NumPlayers } from '../gameCore/gameState';

interface OptionsViewProps {
    startGame: (numPlayers: NumPlayers) => void;
}
export function OptionsView({ startGame }: OptionsViewProps) {

    const [numPlayers, setNumPlayers] = useState<NumPlayers>(3);
    function validate(n: number, defaultVal: NumPlayers): NumPlayers {
        if ([2, 3, 4].includes(n)) {
            return n as NumPlayers;
        } else {
            return defaultVal;
        }
    }
    return (
        <div>
            Number of players:
            <input
                type="number"
                min="2" max="4"
                value={numPlayers}
                onChange={(e) => setNumPlayers(prev => validate(parseInt(e.target.value), prev))} />
            <button onClick={() => startGame(numPlayers)}>Start!</button>
        </div>
    );
}
