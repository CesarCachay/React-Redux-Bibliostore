import React from "react";
import Clients from "./components/clients/Clients";
import EditClient from "./components/clients/EditClient";
import ShowClient from "./components/clients/ShowClient";
import NewClient from "./components/clients/NewClient";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/clients" component={Clients} />
        <Route exact path="/clients/new" component={NewClient} />
        <Route exact path="/clients/show/:id" component={ShowClient} />
        <Route exact path="/clients/edit/:id" component={EditClient} />
      </Switch>
    </Router>
  );
}

export default App;
