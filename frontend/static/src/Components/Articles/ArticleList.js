import ArticleLink from "./ArticleLink";
import { nanoid } from "nanoid";
import "./article-list.css";

function ArticleList(props) {
	const articlesHTML = props.articles.map((article) => (
		<ArticleLink
			key={nanoid()}
			article={article}
			setNewArticle={props.setNewArticle}
		/>
	));

	return <ul className="link-list">{articlesHTML}</ul>;
}

export default ArticleList;

// OLD CODE FOR NOTES ?

// const INITIAL_ARTICLES = ["article 1", "article 2", "Funny comics", "dsytopia"];

// // Initial load of any posts
// const [articles, setArticles] = useState(INITIAL_ARTICLES);
// useEffect(() => {
// 	const getArticles = async (e) => {
// 		const options = {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 				"X-CSRFToken": Cookies.get("csrftoken"),
// 			},
// 		};
// 		// let category = "";
// 		// if (props.currCategory) category = props.currCategory;
// 		const response = await fetch(
// 			`api_v1/posts/${props.currCategory}`,
// 			options
// 		);
// 		if (!response.ok) {
// 			throw new Error(
// 				`unable to get articles based on category: ${props.currCategory}`
// 			);
// 		}
// 		const data = await response.json();
// 		console.log("new category data", data);
// 		if (data.length > 0) {
// 			setArticles(data);
// 		}
// 	};
// 	getArticles();
// }, [props.currCategory]);

// useEffect(() => {
// 	const getArticles = async (e) => {
// 		const options = {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 				"X-CSRF-Token": Cookies.get("csrftoken"),
// 			},
// 		};
// 		const response = await fetch("api_v1/posts/", options);
// 		if (!response.ok) {
// 			throw new Error(
// 				`unable to get articles based on category: ${props.currCategory}`
// 			);
// 		}
// 		const data = await response.json();
// 		console.log("initial articles data:", data);
// 		setArticles(data);
// 	};
// 	getArticles();
// }, []);
