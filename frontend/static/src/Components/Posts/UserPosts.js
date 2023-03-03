import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ArticleList from "../Articles/ArticleList";
import ArticleView from "../Articles/ArticleView";
import EditView from "./EditView";
import Cookies from "js-cookie";
import "./User-Posts.css";
import { useNavigate } from "react-router-dom";

const INITIAL_ARTICLE = {
	title: "Article Title",
	text: "Article text",
	username: "someone",
};
const INITIAL_ARTICLES = ["article 1", "article 2", "Funny comics", "dsytopia"];

function UserPosts(props) {
	const [currArticle, setCurrArticle] = useState(INITIAL_ARTICLE);
	const [newArticle, setNewArticle] = useState("");
	const navigate = useNavigate();

	// Getting specific article when newArticle is changed - sets to currArticle for <ArticleView />
	useEffect(() => {
		const getArticle = async (e) => {
			const options = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": Cookies.get("csrftoken"),
				},
			};
			const response = await fetch(
				`api_v1/posts/drafts/${newArticle}`,
				options
			);
			if (!response.ok) {
				throw new Error(`Could not retrieve draft: ${newArticle}`);
			}
			const data = await response.json();
			setCurrArticle(data);
		};
		getArticle();
	}, [newArticle]);

	// Initial load of drafts
	const [articles, setArticles] = useState(INITIAL_ARTICLES);
	// Getting articles for list - from /drafts/
	useEffect(() => {
		const getArticles = async (e) => {
			const options = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-Token": Cookies.get("csrftoken"),
				},
			};
			const response = await fetch("api_v1/posts/drafts/", options);
			if (!response.ok) {
				throw new Error(`unable to get drafts`);
			}
			const data = await response.json();
			setArticles(data);
		};
		getArticles();
	}, []);

	return (
		<section>
			<div id="user-post-title">
				<h1>Your Posts:</h1>
				<button onClick={() => navigate("/new")}>New post</button>
			</div>
			<main>
				<ArticleList articles={articles} setNewArticle={setNewArticle} />
				<EditView currArticle={currArticle} />
				{/* MAKE DraftView - CARBON COPY OF ARTICLEVIEW BUT WITH EDITABLE FIELDS */}
			</main>
		</section>
	);
}

export default UserPosts;
