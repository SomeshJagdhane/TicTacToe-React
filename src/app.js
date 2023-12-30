import { useState } from "react";

function Box({ boxId, value, onBoxClick }) {
  return (
    <button id={boxId} className="box" onClick={onBoxClick}>
      {value}
    </button>
  );
}

function Board({ boxes, onPlay, isXNext }) {
  let status;
  const winner = calculateWinner(boxes);
  if (winner) {
    status = `Winner : ${winner.name}`;
    toggleWinBoxes(winner); // highlight winning boxes
  } else status = `Next turn : ${isXNext ? "X" : "O"}`;

 
  function handleClickBox(i) {
    if (boxes[i] || winner) return; // if clicked box already contains a value or winner is found

    const newBoxes = boxes.slice();
    newBoxes[i] = isXNext ? "X" : "O";

    onPlay(newBoxes);
  }

  return (
    <div className="board">
      <p className="status">{status}</p>
      <div className="box-row">
        <Box
          boxId={`box-0`}
          value={boxes[0]}
          onBoxClick={() => handleClickBox(0)}
        />
        <Box
          boxId={`box-1`}
          value={boxes[1]}
          onBoxClick={() => handleClickBox(1)}
        />
        <Box
          boxId={`box-2`}
          value={boxes[2]}
          onBoxClick={() => handleClickBox(2)}
        />
      </div>
      <div className="box-row">
        <Box
          boxId={`box-3`}
          value={boxes[3]}
          onBoxClick={() => handleClickBox(3)}
        />
        <Box
          boxId={`box-4`}
          value={boxes[4]}
          onBoxClick={() => handleClickBox(4)}
        />
        <Box
          boxId={`box-5`}
          value={boxes[5]}
          onBoxClick={() => handleClickBox(5)}
        />
      </div>
      <div className="box-row">
        <Box
          boxId={`box-6`}
          value={boxes[6]}
          onBoxClick={() => handleClickBox(6)}
        />
        <Box
          boxId={`box-7`}
          value={boxes[7]}
          onBoxClick={() => handleClickBox(7)}
        />
        <Box
          boxId={`box-8`}
          value={boxes[8]}
          onBoxClick={() => handleClickBox(8)}
        />
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const isXNext = currentMove % 2 === 0;
  const currentBoxes = history[currentMove];

  const moves = history.map((box, move) => {
    const description =
      move > 0 ? `Go to move #${move}` : `Go to the game starting`;

    return (
      <li className="move" key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function jumpTo(move) {
    setCurrentMove(move);
    toggleWinBoxes(false); // remove highlight from all boxes
  }

  function handlePlay(newBoxes) {
    const newHistory = [...history.slice(0, currentMove + 1), newBoxes];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  }
  return (
    <div className="game">
      <Board boxes={currentBoxes} onPlay={handlePlay} isXNext={isXNext} />
      <ol className="moves">{moves}</ol>
    </div>
  );
}

function toggleWinBoxes(winner) {
  if(winner){
    // add hightlight to winning boxes
    winner.ids.forEach((id) => {
      document.getElementById(id).classList.add(`winner-box`);
    });

    
  }
  else{
    // remove highlight from all boxes
    document.querySelectorAll(`.box`).forEach(box=>box.classList.remove(`winner-box`));
  }
}

function calculateWinner(boxes) {
  const winningBoxes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const winBoxes of winningBoxes) {
    const [a, b, c] = winBoxes;
    if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c])
      return {
        name: boxes[a],
        ids: [`box-${a}`, `box-${b}`, `box-${c}`],
      };
  }
  return null;
}
