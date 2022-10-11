import React from "react";
import "./GameOverScreen.css";
export default function GameOverScreen({ getNewGame, score }) {
	return (
		<>
			<div className="game-over-screen">
				<h2>Game Over</h2>
				<p>{`Score: ${score}`}</p>
				<button onClick={getNewGame}>New Game</button>
			</div>
			;
		</>
	);
}
