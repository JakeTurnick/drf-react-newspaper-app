import "./App.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import CateNav from "../Articles/CateNav";
import ArticleList from "../Articles/ArticleList";
import ArticleView from "../Articles/ArticleView";
import Cookies from "js-cookie";

const INITIAL_ARTICLE = {
	title: "Article Title",
	text: "Article text",
	username: "someone",
};

const INITIAL_ARTICLES = ["article 1", "article 2", "Funny comics", "dsytopia"];

function App() {
	// const [isAuth] = useContext();
	const [currArticle, setCurrArticle] = useState(INITIAL_ARTICLE);
	const [newArticle, setNewArticle] = useState(null);
	// When new article is selected, fetch that article
	useEffect(() => {
		const getArticle = async (e) => {
			const options = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": Cookies.get("csrftoken"),
				},
			};
			const response = await fetch(`api_v1/posts/${newArticle}`, options);
			if (!response.ok) {
				throw new Error(`Could not retrieve draft: ${newArticle}`);
			}
			const data = await response.json();
			setCurrArticle(data);
		};
		getArticle();
	}, [newArticle]);

	// Initial load of any posts
	const [articles, setArticles] = useState(INITIAL_ARTICLES);
	const [currCategory, setCurrCategory] = useState("");
	useEffect(() => {
		const getArticles = async (e) => {
			const options = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": Cookies.get("csrftoken"),
				},
			};
			let response;
			if (currCategory == "") {
				response = await fetch(`api_v1/posts`, options);
			} else {
				response = await fetch(
					`api_v1/posts/category/${currCategory}`,
					options
				);
			}

			if (!response.ok) {
				throw new Error(
					`unable to get articles based on category: ${currCategory}`
				);
			}
			const data = await response.json();
			console.log("new category data", data);
			if (data.length > 0) {
				setArticles(data);
			}
		};
		getArticles();
	}, [currCategory]);

	useEffect(() => {
		const getArticles = async (e) => {
			const options = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-Token": Cookies.get("csrftoken"),
				},
			};
			const response = await fetch("api_v1/posts/", options);
			if (!response.ok) {
				throw new Error(
					`unable to get articles based on category: ${currCategory}`
				);
			}
			const data = await response.json();
			console.log("initial articles data:", data);
			setArticles(data);
		};
		getArticles();
	}, []);

	return (
		<div className="app-body">
			<nav className="App-header">
				<CateNav setCurrCategory={setCurrCategory} />
			</nav>
			<main>
				<ArticleList
					articles={articles}
					setCurrCategory={setCurrCategory}
					setNewArticle={setNewArticle}
				/>
				<ArticleView currArticle={currArticle} />
			</main>
		</div>
	);
}

export default App;
