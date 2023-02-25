import "./App.css";
import { useState, useEffect } from "react";
import CateNav from "../Articles/CateNav";
import ArticleList from "../Articles/ArticleList";
import ArticleView from "../Articles/ArticleView";
import Cookies from "js-cookie";

const INITIAL_ARTICLE = {
	title: "Article Title",
	text: "Article text",
};

function App() {
	const [currArticle, setCurrArticle] = useState(INITIAL_ARTICLE);
	const [newArticle, setNewArticle] = useState(null);
	const [currCategory, setCurrCategory] = useState("all");

	useEffect(() => {
		const getArticles = async (e) => {
			const options = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": Cookies.get("csrftoken"),
				},
			};
			const response = await fetch(`api_v1/posts/${newArticle}`, options);
			const data = await response.json();
			setCurrArticle(data);
		};
		getArticles();
	}, [newArticle]);

	return (
		<div className="app-body">
			<nav className="App-header">
				<CateNav setCurrCategory={setCurrCategory} />
			</nav>
			<main>
				<ArticleList
					currCategory={currCategory}
					setNewArticle={setNewArticle}
				/>
				<ArticleView article={currArticle} />
			</main>
		</div>
	);
}

export default App;
