import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import Player from "./components/Player"
import { useState } from "react"
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

function deriveActivePlayer(gameTurns)
{
  let currentPlayer = 'X';
      if (gameTurns.length > 0 && gameTurns[0].player === 'X')
      {
        currentPlayer = 'O';
      } 
      return currentPlayer;

}
function App() {

  //creating the state heare so that 2 components can share the state which are in this component
  //const[activePlayer,setActivePlayer] = useState('X');
  
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  const[players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });

  let gameBoard = [...initialGameBoard.map(array => [...array])]

    for(const turn of gameTurns)
    {
        const {square,player} = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

    let winner;
    for(const combinations of WINNING_COMBINATIONS)
    {
      const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
      const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
      const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

        if( firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
        {
          winner = players[firstSquareSymbol];
        }
    }

    function handleRematch()
    {
      setGameTurns([]);
    }
    const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex,colIndex) {
    //setActivePlayer((currentActivePlayer) => currentActivePlayer==='X'?'O':'X')
    setGameTurns(prevTurns=> {
      const currentPlayer = deriveActivePlayer(gameTurns);
      const updatedTurns = [
        { square: { row:rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns,
      ]

      return updatedTurns;
    })
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={players['X']} symbol={"X"} isActive={activePlayer==='X'} onChnageName={handlePlayerNameChange}/>
          <Player initialName={players['O']} symbol={"O"} isActive={activePlayer==='O'} onChnageName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} Restart={handleRematch} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
    
  )
}

export default App
