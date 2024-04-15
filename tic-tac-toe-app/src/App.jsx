import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGB = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameturns){
  let currentplayer = 'X';
      if(gameturns.length>0 && gameturns[0].player==='X'){
        currentplayer='O';
      }
      return currentplayer;
}

function App() {
  // const [activeplayer,setactiveplayer] = useState('X');
  const [gameturns,setgameturns] = useState([]);
  // const [hasWinner,setHasWinner] = useState(false);

  let gameBoard = [...initialGB.map(array=>[...array])];
  for(const turn of gameturns){
    const {square,player} = turn; 
    const{row,col} = square;
    gameBoard[row][col]=player;
  }

  const activeplayer = deriveActivePlayer(gameturns);

  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol&&firstSquareSymbol===secondSquareSymbol&&firstSquareSymbol===thirdSquareSymbol){
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameturns.length===9 && !winner;

  function handleSelectSquare(rowindex,colindex){   
    // setactiveplayer((currentactiveplayer)=>currentactiveplayer === 'X'?'O':'X');
    setgameturns((prevturns)=>{
      const currentplayer = deriveActivePlayer(prevturns);
      const updatedTurns = [{square:{row:rowindex,col:colindex},player:currentplayer},...prevturns];
      return updatedTurns;
    })
  }

  function handleRematch(){
    setgameturns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name='Player 1' symbol='X' isActive={activeplayer==='X'}/>
          <Player name='Player 2' symbol='O' isActive={activeplayer==='O'}/>
        </ol>
        {(winner || hasDraw)&&<GameOver winner={winner} onRematch={handleRematch}/>}
        <GameBoard onSelectSquare = {handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameturns}/>
    </main>
  );
}

export default App;
