import React from "react";
import capitalize from "../..//util/util.js";
import "./Card.css";

export default function Card({ pokemon, index, handleClick }) {
	return (
		<div
			className="card"
			onClick={() => {
				handleClick(index);
			}}
		>
			<h2 className="pokemon-name">{capitalize(pokemon.name)}</h2>
			<img src={pokemon.imgURL} alt={pokemon.name}></img>
		</div>
	);
}
