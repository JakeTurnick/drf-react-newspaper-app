import "./header.css";
import { useNavigate, NavLink } from "react-router-dom";
import Cookies from "js-cookie";

function Header(props) {
	const navigate = useNavigate();
	const signOut = async (e) => {
		const options = {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: "",
		};
		const response = await fetch("dj-rest-auth/logout/", options);
		if (!response.ok) {
			throw new Error("Error when signing out");
		}
		const data = await response.json();
		// console.log("sign out data: ", data);
		props.setAuth(false);
		props.setCurrUser(null);
		props.setIsSu(false);
		Cookies.remove("Authorization");
		navigate("/home");
	};

	return (
		<header>
			<nav id="header-nav">
				{/* ALWAYS VISIBLE */}
				<NavLink className="header-link" to="/home">
					Home
				</NavLink>
				{/* LOGGED IN */}
				{props.isAuth && (
					<NavLink className="header-link" to="/profile">
						My drafts
					</NavLink>
				)}
				{props.isSu && (
					<NavLink className="header-link" to="/review">
						Submitted Review
					</NavLink>
				)}
				{/* {props.isAuth && (
					<NavLink className="header-link" to="/test">
						Test
					</NavLink>
				)} */}
				{/* NOT LOGGED IN  */}
				{!props.isAuth && (
					<NavLink className="header-link" to="/login">
						Login
					</NavLink>
				)}
				{!props.isAuth && (
					<NavLink className="header-link" to="/signup">
						Sign up
					</NavLink>
				)}
			</nav>
			{props.isAuth ? (
				<section className="user-area">
					<NavLink className="header-link" to="/home">
						Welcome {props.currUser}
					</NavLink>
					<button id="sign-out" onClick={signOut}>
						Sign out?
					</button>
				</section>
			) : (
				<section className="user-area">
					<NavLink className="header-link" to="/login">
						Have an account?
					</NavLink>
				</section>
			)}
		</header>
	);
}

export default Header;
