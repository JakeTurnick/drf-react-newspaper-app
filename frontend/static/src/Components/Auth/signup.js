import "./AuthForm.css";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Cookies from "js-cookie";

function SignupForm(props) {
	const [isAuth, setAuth, setCurrUser] = useOutletContext();
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const [user, setUser] = useState({
		username: "",
		email: "",
		password1: "",
		password2: "",
	});

	const handleError = (err) => {
		console.warm(err);
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
		console.log("User info:", user);
		if (user.password1 != user.password2) {
			setError("Passwords do not match");
		}

		// uncomment for build
		const options = {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(user),
		};
		const response = await fetch("dj-rest-auth/registration/", options);
		if (!response.ok) {
			throw new Error("Could not create user account");
		}
		const data = await response.json();
		console.log("signup response: ", response);
		Cookies.set("Authorization", `Token ${data.key}`);
		setAuth(true);
		setCurrUser(user.username.toUpperCase());
		navigate("/home");
	};

	return (
		<div id="form-container">
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
					<label htmlFor="email1">Email address</label>
					<input
						type="email"
						className="form-control"
						id="email"
						name="email"
						value={user.email}
						onChange={handleInput}
						aria-describedby="emailHelp"
						placeholder="Enter email"
					/>
					<small id="emailHelp" className="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className="form-group">
					<label htmlFor="password1">Password</label>
					<input
						type="password"
						className="form-control"
						id="password1"
						name="password1"
						value={user.password1}
						onChange={handleInput}
						placeholder="Secure Password"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password2">Confirm Password</label>
					<input
						type="password"
						className="form-control"
						id="password2"
						name="password2"
						value={user.password2}
						onChange={handleInput}
						placeholder="Confirm Password"
					/>
				</div>
				<div id="form-error">{error}</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}

export default SignupForm;
