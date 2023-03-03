import "../Articles/article-view.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Cookies from "js-cookie";
import ArticleList from "../Articles/ArticleList";
import PublishView from "./PublishView";

const INITIAL_ARTICLE = {
	title: "Select an article",
	text: "articles are loaded in the list to the left, click on to see it here!",
	username: "someone",
};
const INITIAL_ARTICLES = ["article 1", "article 2", "Funny comics", "dsytopia"];

function AdminPosts(props) {
	const [currArticle, setCurrArticle] = useState(INITIAL_ARTICLE);
	const [newArticle, setNewArticle] = useState("");
	const [isSu] = useOutletContext();

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
			console.log("articles:", data);
			setArticles(data);
		};
		getArticles();
	}, []);

	return (
		<section>
			{isSu ? (
				<main>
					<ArticleList articles={articles} setNewArticle={setNewArticle} />
					<PublishView currArticle={currArticle} />
					{/* MAKE DraftView - CARBON COPY OF ARTICLEVIEW BUT WITH EDITABLE FIELDS */}
				</main>
			) : (
				<h1>This page is for admins only</h1>
			)}
		</section>
	);
}

export default AdminPosts;
