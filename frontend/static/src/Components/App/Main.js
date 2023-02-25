import "./App.css";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "./Header";

function Main() {
    const [currUser, setCurrUser] = useState(null)
	const [isAuth, setAuth] = useState(!!Cookies.get("Authorization"));
    useEffect(() => {
        console.log("new auth: ", isAuth)
    }, [isAuth])
    
	return (
		<>
			<Header isAuth={isAuth} setAuth={setAuth} currUser={currUser} />
			<Outlet context={[isAuth, setAuth, setCurrUser]} />
			{/* Outlet changes base on route */}
		</>
	);
}

export default Main;
