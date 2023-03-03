import "./article-view.css";

function ArticleView(props) {
	// console.log("ArticleView props: ", props);
	return (
		<section id="article-view">
			{props.currArticle.title ? (
				<h1>{props.currArticle.title}</h1>
			) : (
				<h1>Select an article</h1>
			)}
			{props.currArticle.username ? (
				<h2>By: {props.currArticle.username}</h2>
			) : (
				<div></div>
			)}
			{props.currArticle.text ? (
				<p>{props.currArticle.text}</p>
			) : (
				<p>Article text here</p>
			)}
		</section>
	);
}

export default ArticleView;
