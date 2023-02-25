import { useState, useEffect } from "react";

function UserPosts(props) {
    const [article, setArticle] = useState(null)
	useEffect(() => {
		const getDraft = async (e) => {
			const options = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": Cookies.get("csrftoken"),
				},
			};
			const response = await fetch("api_v1/posts/drafts", options);
			if (!response.ok) {
				throw new Error("Couldn't fetch articles");
			}
			const data = await response.json();
			console.log("Get draft data: ", data);
			setArticles(data);
		};
		getDraft();
	});

	const articlesHTML = articles.map((article) => (
		<ArticleLink
			key={nanoid()}
			article={article}
			setNewArticle={props.setNewArticle}
		/>
	));

	return (
        <section>
            <h1>Your Posts:</h1>
            <main>
                <ArticleList
                    setNewArticle={setArticle}
                />
                <ArticleView article={currArticle} />
            </main>
        </section>
    );
}
