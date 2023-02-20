import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <PirateMemoryGame />
    </div>
  )
}

function PirateMemoryGame() {
  const deck = createDeck();
  return <div className="game">
    <div className="cardGrid">
      {deck.map(c => (
        <div className={`card ${c.creature} ${c.backing} faceDown`}>{c.creature}</div>
      ))}
    </div>
  </div >
}
export default App

const allBackings = ["lava", "water", "desert", "flowers", "jungle"] as const;
export type Backing = typeof allBackings[number];
const allCreatures = ["🐧", "🐢", "🐙", "🐋", "🦀"] as const;
export type Creature = typeof allCreatures[number];
export interface Card {
  backing: Backing;
  creature: Creature;
}

function createDeck() {
  const cards: Card[] = [];
  for (const backing of allBackings) {
    for (const creature of allCreatures) {
      const c: Card = { backing, creature };
      cards.push(c)
    }
  }
  const shuffled = shuffle(cards);
  shuffled.pop();
  return shuffled;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr.sort(() => Math.random() < 0.5 ? -1 : 1)];
}
