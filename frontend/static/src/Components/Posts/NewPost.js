import "./NewPost.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const INITIAL_ARTICLE = {
	title: "Article Title",
	text: "Article text",
	username: "someone",
};

function NewPost(props) {
	const [post, setPost] = useState({});
	const navigate = useNavigate();

	const handleInput = (e) => {
		const { name, value } = e.target;
		setPost((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const submitDraft = async (e) => {
		// console.log("submit post: ", post)
		e.preventDefault();
		const putPost = {
			title: post.title,
			text: post.text,
			category: post.category,
			is_submitted: true,
			is_published: false,
		};
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(putPost),
		};
		const response = await fetch(`api_v1/posts/new/`, options);
		if (!response.ok) {
			throw new Error(`Could not submit post ${putPost}`);
		}
		const data = await response.json();
		console.log("Submit Draft PUT data: ", data);
		navigate("/profile");
	};

	const saveDraft = async (e) => {
		// console.log("submit post: ", post)
		e.preventDefault();
		const putPost = {
			title: post.title,
			text: post.text,
			category: post.category,
			is_submitted: false,
			is_published: false,
		};
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(putPost),
		};
		const response = await fetch(`api_v1/posts/new/`, options);
		if (!response.ok) {
			throw new Error(`Could not submit post ${putPost}`);
		}
		const data = await response.json();
		console.log("Submit Draft POST data: ", data);
		navigate("/profile");
	};

	return (
		<div id="new-post">
			<h1>I am a new Post</h1>
			<form onSubmit={(e) => e.preventDefault()}>
				<div id="post-typing">
					<label htmlFor="title">Post Title:</label>
					<input
						type="text"
						id="title"
						name="title"
						value={post.title}
						onChange={handleInput}
					/>
					<label htmlFor="text">Post text:</label>
					<input
						type="text"
						id="text"
						name="text"
						value={post.text}
						onChange={handleInput}
					/>
				</div>
				<fieldset>
					<legend>Select a Post Category</legend>

					<div id="category-choice">
						<label htmlFor="">
							Business
							<input
								type="radio"
								name="category"
								id="bussiness"
								value={"bus"}
								onChange={handleInput}
							></input>
						</label>
						<label htmlFor="">
							Gaming
							<input
								type="radio"
								name="category"
								id="gaming"
								value={"game"}
								onChange={handleInput}
							></input>
						</label>
						<label htmlFor="">
							Health
							<input
								type="radio"
								name="category"
								id="health"
								value={"hlth"}
								onChange={handleInput}
							></input>
						</label>
						<label htmlFor="">
							Politics
							<input
								type="radio"
								name="category"
								id="politics"
								value={"pol"}
								onChange={handleInput}
							></input>
						</label>
						<label htmlFor="">
							World
							<input
								type="radio"
								name="category"
								id="world"
								value={"wrld"}
								onChange={handleInput}
							></input>
						</label>
					</div>
				</fieldset>

				<div className="choice">
					<button id="save" onClick={saveDraft}>
						Save as Draft
					</button>
					<button id="submit" onClick={submitDraft}>
						Submit Post
					</button>
				</div>
			</form>
		</div>
	);
}

export default NewPost;

// const INITIAL_CATES = [
// 	{
// 		name: "All",
// 		tag: "",
// 	},
// 	{
// 		name: "Business",
// 		tag: "bus",
// 	},
// 	{
// 		name: "Gaming",
// 		tag: "game",
// 	},
// 	{
// 		name: "Health",
// 		tag: "hlth",
// 	},
// 	{
// 		name: "Politics",
// 		tag: "pol",
// 	},
// 	{
// 		name: "World",
// 		tag: "wrld",
// 	},
// ];
