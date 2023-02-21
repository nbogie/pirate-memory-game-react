import { useState } from 'react';
import { NumPlayers } from '../gameCore/gameState';
import './App.css'
import { OptionsView } from './OptionsView';
import { PirateMemoryGame } from './PirateMemoryGame'

function App() {
  const [numPlayers, setNumPlayers] = useState<NumPlayers | null>(null);

  function startGame(givenNumPlayers: NumPlayers): void {
    setNumPlayers(givenNumPlayers)
  }

  return (
    <div className="App">
      {numPlayers === null ?
        <OptionsView startGame={startGame} /> :
        <PirateMemoryGame numPlayers={numPlayers} />
      }
    </div>
  )
}
export default App
