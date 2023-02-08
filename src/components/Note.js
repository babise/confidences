import React, { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Airtable from "airtable";

const base = new Airtable({ apiKey: "keytZsUiKc0aVD9YN" }).base(
	"appzOcDa5jkNEeHnZ"
);

const formatDate = (dateString) => {
	const date = new Date(dateString);
	const options = {
		day: "2-digit",
		month: "2-digit",
		year: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "UTC",
		hour12: false, // eslint-disable-next-line
		year: undefined, // eslint-disable-next-line
		month: "numeric", // eslint-disable-next-line
		day: "numeric",
	};
	return (
		date.toLocaleDateString("fr-FR", options) +
		" " +
		date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
	);
};

function Note({ note, refresh, setRefresh }) {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(note.fields.titre);
	const [content, setContent] = useState(note.fields.contenu);

	const createdAt = formatDate(note.fields.createdAt);
	const editedAt = formatDate(note.fields.editedAt);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		base("Notes").update(
			note.fields.key,
			{
				titre: title,
				contenu: content,
			},
			(err) => {
				if (err) {
					console.error(err);
				} else {
					setRefresh(refresh + 1);
				}
				setIsEditing(false);
			}
		);
	};
	const handleDelete = () => {
		base("Notes").destroy(note.fields.key, (err) => {
			if (err) {
				console.error(err);
			} else {
				setRefresh(refresh + 1);
			}
		});
	};

	const redStyle = { color: "red" };
	const greenStyle = { color: "green" };
	const titleStyle = note.fields.status === "Private" ? redStyle : greenStyle;
	const contentStyle = note.fields.status === "Private" ? redStyle : greenStyle;

	return (
		<div className="cardNote">
			{isEditing ? (
				<div className="containerAddNote">
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
					<button onClick={handleSave}>Enregistrer</button>
				</div>
			) : (
				<div style={{ margin: 20 }}>
					<h4 style={titleStyle}>{title}</h4>
					<ReactMarkdown style={contentStyle}>{content}</ReactMarkdown>
					<button onClick={handleEdit}>Editer</button>
					<button onClick={handleDelete}>Supprimer</button>
				</div>
			)}
			<div className="dateNote">
				<p>Créée le : {createdAt}</p>
				<p>Modifiée le : {editedAt}</p>
			</div>
		</div>
	);
}

export default Note;
