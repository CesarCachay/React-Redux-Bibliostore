import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import Spinner from "../layout/Spinner";
import ClientCard from "../clients/ClientCard";

// This will be possible to use when you connect with react-redux at the end of this component
import { searchUser } from "../../actions/searchUserActions";

class BorrowBook extends Component {
  state = {
    noResults: false,
    search: ""
  };

  searchClient = e => {
    e.preventDefault();
    const { search } = this.state;
    const { firestore, searchUser } = this.props;

    // Make a query in our database
    const collection = firestore.collection("clients");
    const query = collection.where("code", "==", search).get();

    // Read the data from our query
    query.then(result => {
      // This means if empty === true
      if (result.empty) {
        searchUser({});
        this.setState({
          noResults: true
        });
      } else {
        const dataFromQuery = result.docs[0];
        searchUser(dataFromQuery.data());
        this.setState({
          noResults: false
        });
      }
    });
  };

  // This will save the student information who ask for books
  askForBook = () => {
    const { user, firestore, history } = this.props;

    // Date to return book
    user.lend_date = new Date().toLocaleDateString();

    let lended = [];
    lended = [...this.props.book.lended, user];
    const book = { ...this.props.book };
    delete book.lended;
    book.lended = lended;

    // Save the changes(update) in the database from firestore
    firestore
      .update({ collection: "books", doc: book.id }, book)
      .then(() =>
        Swal.fire({
          position: "center",
          type: "success",
          title: "Book lended successfully!",
          showConfirmButton: false,
          timer: 1500
        })
      )
      .then(history.push("/"));
  };

  readData = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { book, user } = this.props;
    const { noResults } = this.state;

    if (!book) return <Spinner />;

    let resultsMessage = "";
    if (noResults) {
      resultsMessage = (
        <div className="alert alert-danger text-center font-weight-bold">
          There is no user with that code.
        </div>
      );
    } else {
      resultsMessage = null;
    }

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/"} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> {""} Go back
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-user"></i> {""} Ask for: {book.name}
          </h2>

          <div className="row justify-content-center mt-5">
            <div className="col-md-8">
              <form onSubmit={this.searchClient} className="mb-4">
                <legend className="color-primary text-center">
                  Search the student by their code:
                </legend>

                <div className="form-group">
                  <input
                    type="text"
                    name="search"
                    className="form-control"
                    onChange={this.readData}
                  />
                  <input
                    type="submit"
                    value="Search Client"
                    className="btn btn-success btn-block"
                  />
                </div>
              </form>
              {/* Here we will show the student card and the button for borrow a book*/}
              {user.first_name ? (
                <>
                  <ClientCard user={user} />
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={this.askForBook}
                  >
                    Borrow Book
                  </button>
                </>
              ) : null}
              {resultsMessage}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  firestoreConnect(props => [
    {
      collection: "books",
      storeAs: "book",
      doc: props.match.params.id
    }
  ]),
  connect(
    ({ firestore: { ordered }, user }, props) => ({
      book: ordered.book && ordered.book[0],
      user: user
    }),
    { searchUser } //Here I'm using the actions of our custom reducers
  )
)(BorrowBook);
