import React from "react";
import Clients from "./components/clients/Clients";
import EditClient from "./components/clients/EditClient";
import ShowClient from "./components/clients/ShowClient";
import NewClient from "./components/clients/NewClient";
import Navbar from "./components/layout/Navbar";

import store from "./store";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/clients" component={Clients} />
            <Route exact path="/clients/new" component={NewClient} />
            <Route exact path="/clients/show/:id" component={ShowClient} />
            <Route exact path="/clients/edit/:id" component={EditClient} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
