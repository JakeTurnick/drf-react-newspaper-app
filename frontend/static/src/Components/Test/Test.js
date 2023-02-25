import "./test.css"
import { useState, useEffect } from "react";
import ArticleLink from "../Articles/ArticleLink";
import Cookies from "js-cookie";
import { nanoid } from "nanoid";

const INITIAL_ARTICLE = {
	title: "Article Title",
	text: "Article text",
};
const INITIAL_ARTICLES = ["article 1", "article 2", "Funny comics", "dsytopia"];

function Test(props) {
    const [currArticle, setCurrArticle] = useState(INITIAL_ARTICLE);
    const [articles, setArticles] = useState(INITIAL_ARTICLES);

    const getAll = async (e) => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
        };
        const response = await fetch("api_v1/posts/", options);
        if (!response.ok) {
            throw new Error("Couldn't fetch articles")
        }
        const data = await response.json();
        console.log("Get all data: ", data)
        setArticles(data);
    }

    const getAdmin = async (e) => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
        };
        const response = await fetch("api_v1/posts/submitted/", options);
        if (!response.ok) {
            throw new Error("Couldn't fetch articles")
        }
        const data = await response.json();
        console.log("Get admin data: ", data)
        setArticles(data);
    }

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
            throw new Error("Couldn't fetch articles")
        }
        const data = await response.json();
        console.log("Get draft data: ", data)
        setArticles(data);
    }

    const articlesHTML = articles.map((article) => (
		<ArticleLink
			key={nanoid()}
			article={article}
			setNewArticle={props.setNewArticle}
		/>
	));


    return (
        <div id="test-body">
            <h1 id="test-title">I am the test</h1>
            <nav>
                <button onClick={getAll} >All</button>
                <button onClick={getAdmin} >Admin</button>
                <button onClick={getDraft} >Draft</button>
            </nav>
            <main>
                <ul className="link-list">{articlesHTML}</ul>;
			</main>
        </div>
    )
}

export default Test