import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Main from "./Components/App/Main";
import App from "./Components/App/App";
import LoginForm from "./Components/Auth/Login";
import SignupForm from "./Components/Auth/signup";
import UserPosts from "./Components/User/UserPosts";
import FourOFour from "./Components/errs/404";
import Test from "./Components/Test/Test";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<Main />} >
					<Route default path="home" element={<App />} />
					<Route path="profile" element={<UserPosts />} />
					<Route path="login" element={<LoginForm />} />
					<Route path="signup" element={<SignupForm />} />
					<Route path="test" element={<Test />} />
				</Route>
				<Route path="*" element={<FourOFour />} />
			</Routes>
		</Router>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
