import React from "react";
import Header from "./components/Header";
import Board from "./components/board/Board";
import "./App.css";

function App() {
	const [score, setScore] = React.useState(0);
	const [highScore, setHighScore] = React.useState(0);
	const [level, setLevel] = React.useState(1);

	return (
		<>
			<Header score={score} highScore={highScore} />;
			<Board
				level={level}
				setLevel={setLevel}
				score={score}
				setScore={setScore}
				highScore={highScore}
				setHighScore={setHighScore}
			></Board>
		</>
	);
}

export default App;
