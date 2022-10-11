import React from "react";
import "./LoadingScreen.css";

export default function LoadingScreen({ level }) {
	return <div className="load-screen">{`Loading Level ${level}`}</div>;
}
