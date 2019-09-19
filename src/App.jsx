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
            <Route exact path="/" component={Books} />
            <Route exact path="/books/new" component={NewBook} />
            <Route exact path="/books/show/:id" component={ShowBook} />
            <Route exact path="/books/edit/:id" component={EditBook} />
            <Route exact path="/books/borrow/:id" component={BorrowBook} />

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
