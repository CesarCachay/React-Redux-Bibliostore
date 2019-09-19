import React from "react";
import Clients from "./components/clients/Clients";
import EditClient from "./components/clients/EditClient";
import ShowClient from "./components/clients/ShowClient";
import NewClient from "./components/clients/NewClient";
import Navbar from "./components/layout/Navbar";

import Books from "./components/books/Books";
import ShowBook from "./components/books/ShowBook";
import NewBook from "./components/books/NewBook";
import EditBook from "./components/books/EditBook";
import BorrowBook from "./components/books/BorrowBook";

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
            <Books exact path="/" component={Books} />
            <NewBook exact path="/books/new" component={NewBook} />
            <ShowBook exact path="/books/show/:id" component={ShowBook} />
            <EditBook exact path="/books/edit/:id" component={EditBook} />
            <BorrowBook exact path="/books/borrow/:id" component={BorrowBook} />

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
