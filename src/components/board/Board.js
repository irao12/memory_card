import React from "react";
import Card from "./Card";
import "./Board.css";
import LoadingScreen from "../menu/LoadingScreen";
import GameOverScreen from "../menu/GameOverScreen";

export default function Board({
	level,
	setLevel,
	score,
	setScore,
	highScore,
	setHighScore,
}) {
	const MIN_ID = 1;
	const MAX_ID = 905;

	const [cardList, setCardList] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [numClicked, setNumClicked] = React.useState(0);
	const [isGameOver, setIsGameOver] = React.useState(false);

	const handleCardClick = (index) => {
		const currCard = cardList[index];
		if (!currCard.hasClicked) {
			setScore((prevScore) => prevScore + 1);
			setNumClicked((prevNumClick) => prevNumClick + 1);

			if (score + 1 > highScore)
				setHighScore((prevHighScore) => prevHighScore + 1);

			setCardList((prevCardList) => {
				return [
					...prevCardList.slice(0, index),
					{ ...currCard, hasClicked: true },
					...prevCardList.slice(index + 1),
				];
			});

			if (numClicked + 1 === level * 2 + 2) {
				setLevel((prevLevel) => prevLevel + 1);
				setNumClicked(0);
			}
			shuffleBoard();
		} else {
			setIsGameOver(true);
		}
	};

	const getNewGame = async () => {
		setScore(0);
		setNumClicked(0);
		setIsGameOver(false);
		if (level === 1) await getNewBoard();
		else setLevel(1);
	};

	const getNewBoard = async () => {
		const newCardList = [];

		setIsLoading(true);
		const numCards = level * 2 + 2;
		for (let i = 0; i < numCards; i++) {
			const id = Math.floor(Math.random() * MAX_ID) + MIN_ID;

			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${id}`
			);
			const pokemonData = await response.json();

			const currPokemon = {
				id: pokemonData.id,
				name: pokemonData.name,
				imgURL: pokemonData.sprites.other["official-artwork"]
					.front_default,
				hasClicked: false,
			};

			newCardList.push(currPokemon);
		}
		setCardList(newCardList);

		setIsLoading(false);
	};

	const shuffleBoard = () => {
		setCardList((prevCards) => {
			const cardListCopy = [...prevCards];
			for (let i = 0; i < cardListCopy.length - 1; i++) {
				const randomIndex =
					Math.floor(Math.random() * (cardListCopy.length - i)) + i;
				const temp = cardListCopy[i];
				cardListCopy[i] = cardListCopy[randomIndex];
				cardListCopy[randomIndex] = temp;
			}
			return cardListCopy;
		});
	};

	React.useEffect(() => {
		getNewBoard();
	}, [level]);

	return (
		<main>
			<div className="board">
				{!isLoading &&
					!isGameOver &&
					cardList.map((card, index) => (
						<Card
							key={card.id}
							pokemon={card}
							index={index}
							handleClick={handleCardClick}
						></Card>
					))}
				{isLoading && <LoadingScreen level={level} />}
				{isGameOver && (
					<GameOverScreen score={score} getNewGame={getNewGame} />
				)}
			</div>
		</main>
	);
}
