import React from "react";
import Header from "./components/Header";
import Board from "./components/board/Board";
import "./App.css";

function App() {
	const MIN_ID = 1;
	const MAX_ID = 905;

	const [score, setScore] = React.useState(0);
	const [highScore, setHighScore] = React.useState(0);
	const [cardList, setCardList] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [level, setLevel] = React.useState(1);

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
	}, []);

	return (
		<>
			<Header score={score} highScore={highScore} />;
			<Board
				cardList={cardList}
				isLoading={isLoading}
				shuffleBoard={shuffleBoard}
			></Board>
		</>
	);
}

export default App;
