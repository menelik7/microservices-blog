const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
	if (type === "PostCreated") {
		const { id, title } = data;

		posts[id] = { id, title, comments: [] };
	}

	if (type === "CommentCreated") {
		const { id, content, postId, status } = data;

		const post = posts[postId];
		post.comments.push({ id, content, status });
	}

	if (type === "CommentUpdated") {
		const { id, postId, content, status } = data;

		const post = posts[postId];
		const comment = post.comments.find((comment) => {
			return comment.id === id;
		});

		comment.status = status;
		comment.content = content;
	}
};

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.post("/events", (req, res) => {
	const { type, data } = req.body;

	handleEvent(type, data);

	res.send({});
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, async () => {
	console.log("App listening on port", PORT);

	try {
		const response = await axios.get("http://event-bus-srv:4005/events");

		for (let event of response.data) {
			const { type, data } = event;
			console.log("Processing event:", type);

			handleEvent(type, data);
		}
	} catch (err) {
		console.log(err.message);
	}
});
