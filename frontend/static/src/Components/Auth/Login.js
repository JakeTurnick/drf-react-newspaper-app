import "./AuthForm.css";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Cookies from "js-cookie";

function LoginForm(props) {
	const [isAuth, setAuth, setCurrUser, setIsSu] = useOutletContext();
	const navigate = useNavigate();

	const toggleAuth = () => {
		setAuth(!isAuth);
	};

	const [user, setUser] = useState({
		username: "",
		password: "",
		is_superuser: false,
	});

	const handleError = (err) => {
		console.warn(err);
	};

	const handleInput = (e) => {
		const { name, value } = e.target;
		setUser((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// testing functionality
		// console.log("User info:", user);

		// uncomment for build
		const options = {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(user),
		};
		const response = await fetch("dj-rest-auth/login/", options).catch(
			handleError
		);
		if (!response.ok) {
			throw new Error("Could not login / authenticate user");
		}
		const data = await response.json();
		// console.log("login data: ", data);
		Cookies.set("Authorization", `Token ${data.key}`);
		setAuth(true);
		setIsSu(data.is_superuser);
		setCurrUser(data.username);
		navigate("/home");
	};

	// const getBg = async (e) => {
	// 	const options = {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			"Accept-Version": "v1",
	// 		},
	// 		body: "some text",
	// 	};
	// 	const response = await fetch("https://api.unsplash.com/", options);
	// 	const data = await response.json();
	// };

	return (
		<div id="form-container">
			<button onClick={toggleAuth}>Toggle auth</button>
			<form id="auth-form" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						className="form-control"
						id="username"
						name="username"
						value={user.username}
						onChange={handleInput}
						placeholder="xX_C00L-n4m3_Xx"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Email address</label>
					<input
						type="email"
						className="form-control"
						id="email"
						name="email"
						aria-describedby="emailHelp"
						placeholder="me@awesome.com"
					/>
					<small id="email" className="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className="form-group">
					<label htmlFor="password1">Password</label>
					<input
						type="password"
						className="form-control"
						id="password"
						name="password"
						value={user.password}
						onChange={handleInput}
						placeholder="Password"
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}

export default LoginForm;
