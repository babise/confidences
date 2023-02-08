import React from "react";
import { Route, Switch } from "react-router-dom";

import User from "./User";

const Router = () => (
	<Switch>
		<Route path="/user/:userId" component={UserPage} />
	</Switch>
);

export default Router;
