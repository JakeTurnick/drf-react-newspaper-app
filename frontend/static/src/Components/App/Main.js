import "./App.css";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "./Header";

function Main() {
	const [currUser, setCurrUser] = useState(null);
	const [isAuth, setAuth] = useState(!!Cookies.get("Authorization"));
	const [isSu, setIsSu] = useState(false);

	// useEffect(() => {
	// 	console.log("new auth: ", isAuth);
	// }, [isAuth]);

	return (
		<>
			<Header
				isAuth={isAuth}
				setAuth={setAuth}
				currUser={currUser}
				isSu={isSu}
				setIsSu={setIsSu}
			/>
			<Outlet context={[isAuth, setAuth, setCurrUser, setIsSu, isSu]} />
			{/* Outlet changes base on route */}
		</>
	);
}

export default Main;
