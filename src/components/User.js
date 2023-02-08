import React, { useState } from "react";
import Airtable from "airtable";
import Note from "./Note";

const base = new Airtable({ apiKey: "keytZsUiKc0aVD9YN" }).base(
	"appzOcDa5jkNEeHnZ"
);

const User = ({ user, notes, refresh, setRefresh }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [status, setStatus] = useState("Public");

	const userKey = [user.fields.key];

	const handleAddNote = (user) => {
		base("Notes").create(
			{
				titre: title,
				contenu: content,
				status: status,
				user: userKey,
			},
			(err, record) => {
				if (err) {
					console.error(err);
				} else {
					setTitle("");
					setContent("");
					setStatus("");
					setRefresh(refresh + 1);
				}
			}
		);
		console.log({
			titre: title,
			contenu: content,
			status: status,
			user: userKey,
		});
	};

	return (
		<div className="userRow">
			<div className="cardUser">
				<div style={{ margin: 20 }}>
					<h2>{user.fields.nom}</h2>
					<h3>Détails Utilisateurs</h3>
					<p>{user.fields.email}</p>
					<p>{user.fields.telephone}</p>
				</div>
			</div>
			<div style={{ margin: 20 }}>
				<h3>Notes Utilisateurs</h3>
				<div className="listNotes">
					{notes.map((note) => (
						<Note
							refresh={refresh}
							setRefresh={setRefresh}
							key={note.fields.key}
							note={note}
						/>
					))}
				</div>
			</div>
			<div className="containerAddNote">
				<h3>Ajouter une note</h3>
				<input
					type="text"
					placeholder="Titre"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					placeholder="Contenu"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<select
					placeholder="Status"
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				>
					<option value="Public">Public</option>
					<option value="Private">Privé</option>
				</select>
				<button onClick={handleAddNote}>Ajouter Note</button>
			</div>
		</div>
	);
};

export default User;
