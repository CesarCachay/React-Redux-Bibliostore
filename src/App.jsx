import React from "react";
import Books from "./components/books/Books";
import ShowBook from "./components/books/ShowBook";
import NewBook from "./components/books/NewBook";
import EditBook from "./components/books/EditBook";
import BorrowBook from "./components/books/BorrowBook";

import Clients from "./components/clients/Clients";
import EditClient from "./components/clients/EditClient";
import ShowClient from "./components/clients/ShowClient";
import NewClient from "./components/clients/NewClient";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";

import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from "./components/library/auth";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={UserIsAuthenticated(Books)} />
            <Route
              exact
              path="/books/new"
              component={UserIsAuthenticated(NewBook)}
            />
            <Route
              exact
              path="/books/show/:id"
              component={UserIsAuthenticated(ShowBook)}
            />
            <Route
              exact
              path="/books/edit/:id"
              component={UserIsAuthenticated(EditBook)}
            />
            <Route
              exact
              path="/books/borrow/:id"
              component={UserIsAuthenticated(BorrowBook)}
            />

            <Route
              exact
              path="/clients"
              component={UserIsAuthenticated(Clients)}
            />
            <Route
              exact
              path="/clients/new"
              component={UserIsAuthenticated(NewClient)}
            />
            <Route
              exact
              path="/clients/show/:id"
              component={UserIsAuthenticated(ShowClient)}
            />
            <Route
              exact
              path="/clients/edit/:id"
              component={UserIsAuthenticated(EditClient)}
            />

            <Route
              exact
              path="/login"
              component={UserIsNotAuthenticated(Login)}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
