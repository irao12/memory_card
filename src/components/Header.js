import React from "react";
import "./Header.css";

export default function Header({ score, highScore }) {
	return (
		<header>
			<h1 className="title">PokeMem</h1>
			<div className="scores">
				<p className="high-score">{`High Score: ${highScore}`}</p>
				<p className="score">{`Score: ${score}`}</p>
			</div>
		</header>
	);
}
