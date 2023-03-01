import "./article-link.css";

function ArticleLink(props) {
	const selectArticle = (e) => {
		console.log(e.target.value);
		props.setNewArticle(e.target.value);
	};

	return (
		<li className="link-li">
			<button
				className="article-link"
				value={props.article.id}
				onClick={selectArticle}
			>
				{props.article.title}
				<p>By: {props.article.author}</p>
			</button>
		</li>
	);
}

export default ArticleLink;
