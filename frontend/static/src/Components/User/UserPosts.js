import { useState, useEffect } from "react";
import ArticleList from "../Articles/ArticleList";
import ArticleView from "../Articles/ArticleView";
import EditView from "../Articles/EditView";
import Cookies from "js-cookie";

const INITIAL_ARTICLE = {
	title: "Article Title",
	text: "Article text",
};
const INITIAL_ARTICLES = ["article 1", "article 2", "Funny comics", "dsytopia"];

function UserPosts(props) {

    const [currArticle, setCurrArticle] = useState(INITIAL_ARTICLE);
	const [newArticle, setNewArticle] = useState("");

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
			const response = await fetch(`api_v1/posts/drafts/${newArticle}`, options);
            if (!response.ok) {
                throw new Error(`Could not retrieve draft: ${newArticle}`)
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
				throw new Error(
					`unable to get drafts`
				);
			}
			const data = await response.json();
			setArticles(data);
		};
		getArticles();
	}, []);

    

	return (
        <section>
            <h1>Your Posts:</h1>
            <main>
				<ArticleList
					articles={articles}
					setNewArticle={setNewArticle}
				/>
				<EditView currArticle={currArticle} />
                {/* MAKE DraftView - CARBON COPY OF ARTICLEVIEW BUT WITH EDITABLE FIELDS */}
			</main>
        </section>
    );
}

export default UserPosts

// OLD CODE NOTES ?


    // const [articles, setArticles] = useState(null)
    // const [newArticle, setNewArticle] = useState(null);
    // const [currArticle, setCurrArticle] = useState({title: "Select an article to edit", text: "The magic of editing happens here"})
	

    // // When new article is selected, fetch that article - set to currArticle
	// useEffect(() => {
	// 	const getArticles = async (e) => {
	// 		const options = {
	// 			method: "GET",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				"X-CSRFToken": Cookies.get("csrftoken"),
	// 			},
	// 		};
	// 		const response = await fetch(`api_v1/posts/${newArticle}`, options);
	// 		const data = await response.json();
	// 		setCurrArticle(data);
	// 	};
	// 	getArticles();
	// }, [newArticle]);

    // useEffect(() => {
            //     const getArticles = async (e) => {
            //         const options = {
            //             method: "GET",
            //             headers: {
            //                 "Content-Type": "application/json",
            //                 "X-CSRFToken": Cookies.get("csrftoken"),
            //             },
            //         };
            //         // let category = "";
            //         // if (props.currCategory) category = props.currCategory;
            //         const response = await fetch(`api_v1/posts/`, options);
            //         if (!response.ok) {
            //             throw new Error(
            //                 `unable to get articles based on category: ${currCategory}`
            //             );
            //         }
            //         const data = await response.json();
            //         console.log("new category data", data);
            //         if (data.length > 0) {
            //             setArticles(data);
            //         }
            //     };
            //     getArticles();
            // }, [currCategory]);
