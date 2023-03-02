import "./article-view.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function PublishView(props) {
	// console.log("PublishView props: ", props);
	const [post, setPost] = useState(props.currArticle);
	const [edit, setEdit] = useState(false);
	// console.log("EditView post: ", post);

	useEffect(() => setPost(props.currArticle), [props.currArticle]);

	const toggleEdit = () => {
		setEdit(!edit);
	};

	const handleInput = (e) => {
		const { name, value } = e.target;
		setPost((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const publishSubmit = async (e) => {
		// console.log("submit post: ", post)
		e.preventDefault();
		const putPost = {
			title: post.title,
			text: post.text,
			author: post.author,
			category: post.category,
			is_submitted: post.is_submitted,
			is_published: true,
		};
		const options = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(putPost),
		};
		const response = await fetch(`api_v1/posts/drafts/${post.id}/`, options);
		if (!response.ok) {
			throw new Error(`Could not submit post ${putPost}`);
		}
		const data = await response.json();
		// console.log("Submit Draft PUT data: ", data)
	};

	const deleteSubmit = async (e) => {
		// console.log("submit post: ", post)
		e.preventDefault();
		const putPost = {
			title: post.title,
			text: post.text,
			author: post.author,
			category: post.category,
			is_submitted: post.is_submitted,
			is_published: post.is_published,
		};
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: "",
		};
		const response = await fetch(`api_v1/posts/drafts/${post.id}/`, options);
		if (!response.ok) {
			throw new Error(`Could not delete post ${putPost}`);
		}
		const data = await response.json();
		// console.log("Submit Draft PUT data: ", data)
	};

	return (
        <div className="publish-container">
            {post ? (
                <section id="edit-view">
                    <div id="article-view">
                        <h1>{post.title}</h1>
                        <h2>By: {post.username}</h2>
                        <p>{post.text}</p>
                    </div>
                    <div className="choice">
                        <button id="publish" onClick={publishSubmit}>
                            Publish submit
                        </button>
                        <button id="delete" onClick={deleteSubmit}>
                            Delete submit
                        </button>
                    </div>
                </section>
            ) : (
                <h1>No post selected</h1>
            )}
        </div>
	);
}

export default PublishView;
