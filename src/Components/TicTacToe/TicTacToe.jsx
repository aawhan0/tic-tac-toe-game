import React, { useState, useRef, useEffect } from 'react'; 
import './TicTacToe.css';
import TTTcircle from "../Assets/TTTcircle.png";
import TTTcross from "../Assets/TTTcross.png";

const TicTacToe = () => {
    const [count, setCount] = useState(0); // Game turn count
    const [lock, setLock] = useState(false); // Lock to prevent further moves after a winner
    const [data, setData] = useState(Array(9).fill("")); // Initialize the grid data with empty strings
    const titleRef = useRef(null); // Reference to the title for displaying winner
    const boxRefs = useRef(Array(9).fill(null)); // Array of refs for each box

    // Update boxes based on the `data` state
    useEffect(() => {
        // Clear the HTML of each box whenever the data changes
        boxRefs.current.forEach((box, index) => {
            if (box) {
                box.innerHTML = data[index] === "x" ? `<img src='${TTTcross}'>` : data[index] === "o" ? `<img src='${TTTcircle}'>` : '';
            }
        });
    }, [data]); // Run whenever `data` state changes

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return; // Prevent toggling if already filled or if locked
        }

        const updatedData = [...data]; // Copy the current data array

        if (count % 2 === 0) {
            updatedData[num] = "x"; // Set the clicked position to "x"
        } else {
            updatedData[num] = "o"; // Set the clicked position to "o"
        }

        setData(updatedData); // Update the state with the new data array
        setCount(count + 1); // Increment the turn count

        checkWinner(updatedData); // Check for a winner with the updated data
    };

    const checkWinner = (currentData) => {
        // Check all winning conditions
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (currentData[a] !== "" && currentData[a] === currentData[b] && currentData[b] === currentData[c]) {
                won(currentData[c]); // Pass the winner ("x" or "o")
                return;
            }
        }
        if (!currentData.includes("") && !lock) { // No empty spaces and no winner
            titleRef.current.innerHTML = "Tie"; // Set the title to "Tie"
        }
    };

    const won = (winner) => {
        setLock(true); // Lock the game when someone wins
        alert(`${winner} wins!`); // Display the winner message
        titleRef.current.innerHTML = `Congratulations: <img src='${winner === "x" ? TTTcross : TTTcircle}'> wins`;
    };

    const resetGame = () => {
        setLock(false); // Unlock the game
        setData(Array(9).fill("")); // Reset the grid data to empty strings
        titleRef.current.innerHTML = "Tic Tac Toe using React"; // Reset the title
        setCount(0); // Reset the count to 0
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>Tic Tac Toe using <span>React</span></h1>

            <div className="board">
                <div className="row1">
                    <div className="boxes" ref={(el) => (boxRefs.current[0] = el)} onClick={(e) => toggle(e, 0)}></div>
                    <div className="boxes" ref={(el) => (boxRefs.current[1] = el)} onClick={(e) => toggle(e, 1)}></div>
                    <div className="boxes" ref={(el) => (boxRefs.current[2] = el)} onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className="row2">
                    <div className="boxes" ref={(el) => (boxRefs.current[3] = el)} onClick={(e) => toggle(e, 3)}></div>
                    <div className="boxes" ref={(el) => (boxRefs.current[4] = el)} onClick={(e) => toggle(e, 4)}></div>
                    <div className="boxes" ref={(el) => (boxRefs.current[5] = el)} onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className="row3">
                    <div className="boxes" ref={(el) => (boxRefs.current[6] = el)} onClick={(e) => toggle(e, 6)}></div>
                    <div className="boxes" ref={(el) => (boxRefs.current[7] = el)} onClick={(e) => toggle(e, 7)}></div>
                    <div className="boxes" ref={(el) => (boxRefs.current[8] = el)} onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>

            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
};

export default TicTacToe;
