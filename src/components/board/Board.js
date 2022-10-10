import React from "react";
import Card from "./Card";
import "./Board.css";

export default function Board({ cardList, isLoading, shuffleBoard }) {
	return (
		<main>
			<div className="board">
				{!isLoading &&
					cardList.map((card) => (
						<Card
							key={card.id}
							pokemon={card}
							handleClick={shuffleBoard}
						></Card>
					))}
			</div>
		</main>
	);
}
