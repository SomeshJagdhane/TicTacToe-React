import { useState } from "react";

function Box({value, onBoxClick}) {
  return <button className="box" onClick={onBoxClick}>{value}</button>;
}

function Board({boxes, onPlay, isXNext}) {
    
  let status;
  const winner = calculateWinner(boxes);
  if(winner)
    status=`Winner : ${winner}`;
  else
    status = `Next turn : ${isXNext? 'X' : 'O'}`

  function handleClickBox(i){
    if(boxes[i] || winner)
      return; // if clicked box already contains a value or winner is found
    
    const newBoxes = boxes.slice();
    newBoxes[i]= isXNext ? 'X' : 'O';
    
    onPlay(newBoxes);
  }

  return (
    <div className="board">
      <p className="status">{status}</p>
      <div className="box-row">
        <Box value={boxes[0]} onBoxClick={()=>handleClickBox(0)}/>
        <Box value={boxes[1]} onBoxClick={()=>handleClickBox(1)}/>
        <Box value={boxes[2]} onBoxClick={()=>handleClickBox(2)}/>
      </div>
      <div className="box-row">
        <Box value={boxes[3]} onBoxClick={()=>handleClickBox(3)}/>
        <Box value={boxes[4]} onBoxClick={()=>handleClickBox(4)}/>
        <Box value={boxes[5]} onBoxClick={()=>handleClickBox(5)}/>
      </div>
      <div className="box-row">
        <Box value={boxes[6]} onBoxClick={()=>handleClickBox(6)}/>
        <Box value={boxes[7]} onBoxClick={()=>handleClickBox(7)}/>
        <Box value={boxes[8]} onBoxClick={()=>handleClickBox(8)}/>
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const isXNext = currentMove % 2===0;
  const currentBoxes = history[currentMove];

  const moves = history.map((box, move)=>{
    const description = move > 0 ? `Go to move #${move}` : `Go to the game starting`;

    return (
      <li className="move" key={move}>
        <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    )
  });

  function jumpTo(move){
    setCurrentMove(move);
  }

  function handlePlay(newBoxes){
    const newHistory = [...history.slice(0, currentMove+1),newBoxes];
    setHistory(newHistory);
    setCurrentMove(newHistory.length-1);
    console.log(newHistory);
  }
  return (
    <div className="game">
      <Board boxes = {currentBoxes} onPlay={handlePlay} isXNext={isXNext}/>
      <ol className = "moves">
        {moves}
      </ol>
    </div>
  );
}

function calculateWinner(boxes){
  const winningBoxes = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(const winBoxes of winningBoxes){
    const [a,b,c]=winBoxes;
    if(boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c])
      return boxes[a];
  }
  return null;
}
