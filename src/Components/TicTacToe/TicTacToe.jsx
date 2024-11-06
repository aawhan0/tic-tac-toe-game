import React, { useState, useRef } from 'react' 
import './TicTacToe.css'
import TTTcircle from "../Assets/TTTcircle.png"
import TTTcross from "../Assets/TTTcross.png"

let data = ["","","","","","","","",""];

const TicTacToe = () => {
    let [count, setCount] = useState(0); // Use proper naming convention
    let [lock, setLock] = useState(false);
    let titleRef = useRef(null);
    const [data, setData] = useState(Array(9).fill("")); // Initialize the grid data

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return; // Prevent toggling if already filled or if locked
        }
        
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${TTTcross}'>`;
            data[num] = "x";
        } else {
            e.target.innerHTML = `<img src='${TTTcircle}'>`;
            data[num] = "o";
        }
        
        setData([...data]); // Update the data state
        setCount(count + 1);  // Update the count (use functional update)

        checkWinner();
    };

    const checkWinner = () => {
        // Check all winning conditions
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (data[a] !== "" && data[a] === data[b] && data[b] === data[c]) {
                won(data[c]); // `won` function now takes the winner ("x" or "o")
                return;
            }
        }
    };

    const won = (winner) => {
        setLock(true); // Lock the game when someone wins
        alert(`${winner} wins!`); // Display a winner message
        if(winner==="x"){
            titleRef.current.innerHTML = `Congratulations: <img src = ${TTTcross}> wins`
        }
        else{
            titleRef.current.innerHTML = `Congratulations: <img src = ${TTTcircle}> wins`

        }
    };

    const resetGame = () => {
        setData(Array(9).fill("")); // Reset the game grid
        setLock(false); // Unlock the game
        setCount(0); // Reset the count
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>Tic Tac Toe using <span>React</span></h1>

            <div className="board">
                <div className="row1">
                    <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className="row2">
                    <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className="row3">
                    <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>

            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
};

export default TicTacToe;
