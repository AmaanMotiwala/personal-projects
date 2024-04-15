
export default function GameBoard({onSelectSquare,board}) {
  
  return (
    <ol id="game-board">
      {board.map((row, rowindex) => (
        <li key={rowindex}>
          <ol>
            {row.map((col, colindex) => (
              <li key={colindex}><button onClick={()=>onSelectSquare(rowindex,colindex)} disabled={col!==null}>{col}</button></li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
