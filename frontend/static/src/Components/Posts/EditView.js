import "../Articles/article-view.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function EditView(props) {
	// console.log("EditView props: ", props);
	const [post, setPost] = useState(props.currArticle);
	const [edit, setEdit] = useState(false);
	const navigate = useNavigate();
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

	const updateDraft = async (e) => {
		e.preventDefault();
		// console.log("update post: ", post);
		const putPost = {
			title: post.title,
			text: post.text,
			author: post.author,
			category: post.category,
			is_submitted: post.is_submitted,
			is_published: post.is_published,
		};
		// console.log("update test: ", putPost);
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
			throw new Error(`Could not update post ${putPost}`);
		}
		const data = await response.json();
		navigate("/profile");
		// console.log("Update Draft PUT data: ", data)
	};

	const submitDraft = async (e) => {
		// console.log("submit post: ", post)
		e.preventDefault();
		const putPost = {
			title: post.title,
			text: post.text,
			author: post.author,
			category: post.category,
			is_submitted: true,
			is_published: post.is_published,
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
		navigate("/profile");
		// console.log("Submit Draft PUT data: ", data)
	};

	const deleteDraft = async (e) => {
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
		navigate("/profile");
		// console.log("Submit Draft PUT data: ", data)
	};

	return (
		<section id="edit-view">
			<button id="edit-toggle" onClick={toggleEdit}>
				{edit ? "Edit article?" : "stop editing"}
			</button>
			{edit ? (
				<div id="article-view">
					{post.title ? <h1>{post.title}</h1> : <h1>Select an article</h1>}
					{post.text ? <p>{post.text}</p> : <p>Article text here</p>}
				</div>
			) : (
				<form id="edit-view">
					{post.title ? (
						<input
							name="title"
							id="edit-title"
							type="text"
							spellCheck="true"
							value={post.title}
							onChange={handleInput}
						></input>
					) : (
						<h1>Select an article</h1>
					)}
					{post.text ? (
						<textarea
							name="text"
							id="edit-text"
							type="text"
							wrap="soft"
							spellCheck="true"
							value={post.text}
							onChange={handleInput}
						></textarea>
					) : (
						<p>Article text here</p>
					)}
					{post.username ? <h2>By: {post.username}</h2> : <div></div>}
					<div className="choice">
						<button id="update" onClick={updateDraft} type="submit">
							Update draft
						</button>
						<button id="submit" onClick={submitDraft}>
							Submit draft
						</button>
						<button id="delete" onClick={deleteDraft}>
							Delete draft
						</button>
					</div>
				</form>
			)}
		</section>
	);
}

export default EditView;
