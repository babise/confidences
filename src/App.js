import React, { useEffect, useState } from "react";
import "./styles/App.css";

import User from "./components/User";

let Airtable = require("airtable");
let base = new Airtable({ apiKey: "keytZsUiKc0aVD9YN" }).base(
	"appzOcDa5jkNEeHnZ"
);

function App() {
	const [users, setUsers] = React.useState([]);
	const [notes, setNotes] = React.useState([]);
	const [refresh, setRefresh] = useState(0);

	useEffect(() => {
		base("Users")
			.select({ view: "Grid view" })
			.eachPage((records, fetchNextPage) => {
				setUsers(records);
				fetchNextPage();
			});
		base("Notes")
			.select({ view: "Grid view" })
			.eachPage((records, fetchNextPage) => {
				setNotes(records);
				fetchNextPage();
			});
	}, [refresh]);

	return (
		<>
			<h1>Utilisateurs</h1>
			{users.map((user) => (
				<User
					key={user.fields.key}
					refresh={refresh}
					setRefresh={setRefresh}
					user={user}
					notes={notes.filter((note) => note.fields.user[0] === user.id)}
				/>
			))}
		</>
	);
}

export default App;
