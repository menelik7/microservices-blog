import { useState } from "react";
import axios from "axios";

export default function PostCreate() {
	const [title, setTitle] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post("http://posts.com/posts/create", {
				title,
			});

			setTitle("");
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label>Title</label>
				<input
					className="form-control"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<button className="btn btn-success">Create post</button>
		</form>
	);
}
