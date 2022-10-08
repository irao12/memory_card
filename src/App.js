import React from "react";
import Header from "./components/Header";
import "./App.css";

function App() {
	const [score, setScore] = React.useState(0);
	const [highScore, setHighScore] = React.useState(0);

	return <Header score={score} highScore={highScore} />;
}

export default App;
