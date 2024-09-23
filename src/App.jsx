import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import Player from "./components/Player"
import { useState } from "react"

function App() {

  //creating the state heare so that 2 components can share the state which are in this component
  const[activePlayer,setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  function handleSelectSquare(rowIndex,colIndex) {
    setActivePlayer((currentActivePlayer) => currentActivePlayer==='X'?'O':'X')
    setGameTurns(prevTurns=> {
      let currentPlayer = 'X';
      if (prevTurns.length > 0 && prevTurns[0].player === 'X')
      {
        currentPlayer = 'O';
      } 
      const updatedTurns = [
        { square: { row:rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns,
      ]

      return updatedTurns;
    })
  }


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={"Player-1"} symbol={"X"} isActive={activePlayer==='X'}/>
          <Player initialName={"Player-2"} symbol={"O"} isActive={activePlayer==='O'}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
    
  )
}

export default App
