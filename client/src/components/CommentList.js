export default function CommentList({ comments }) {
	const renderedComments = comments.map(({ id, content, status }) => {
		let commentContent;

		switch (status) {
			case "approved":
				commentContent = content;
				break;
			case "pending":
				commentContent = "This comment is awaiting moderation.";
				break;
			case "rejected":
				commentContent =
					"This comment has been rejected for inappropriate content.";
				break;
			default:
				break;
		}

		if (status === "pending") {
		}
		return <li key={id}>{commentContent}</li>;
	});

	return <ul>{renderedComments}</ul>;
}
