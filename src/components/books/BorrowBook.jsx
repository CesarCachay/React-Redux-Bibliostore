import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import Spinner from "../layout/Spinner";

import ClientCard from "../clients/ClientCard";

class BorrowBook extends Component {
  state = {
    noResults: false,
    search: "",
    result: {}
  };

  searchClient = e => {
    e.preventDefault();
    const { search } = this.state;
    const { firestore } = this.props;

    // Make a query in our database
    const collection = firestore.collection("clients");
    const query = collection.where("code", "==", search).get();

    // Read the data from our query
    query.then(result => {
      // This means if empty === true
      if (result.empty) {
        this.setState({ noResults: true, result: {} });
      } else {
        const dataFromQuery = result.docs[0];
        this.setState({ result: dataFromQuery.data(), noResults: false });
      }
    });
  };

  // This will save the student information who ask for books
  askForBook = () => {
    const student = this.state.result;
    // Date to return book
    student.lend_date = new Date().toLocaleDateString();

    // Get the book
    const updatedBook = this.props.book;
    // Add the student or client to our boook
    updatedBook.lended.push(student);

    const { firestore, history, book } = this.props;

    // Save the changes(update) in the database from firestore
    firestore
      .update({ collection: "books", doc: book.id }, updatedBook)
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
    const { book } = this.props;

    if (!book) return <Spinner />;

    const { noResults, result } = this.state;

    // let studentCard, btnAsk;
    // if (result.name) {
    //   studentCard = <ClientCard client={result} />;
    //   btnAsk = (
    //     <button type="button" className="btn btn-success" onClick={askForBook}>
    //       Ask for this book
    //     </button>
    //   );
    // } else {
    //   studentCard = null;
    //   btnAsk = null;
    // }

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/clients"} className="btn btn-secondary">
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
              {result.first_name ? (
                <>
                  <ClientCard result={result} />
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={this.askForBook}
                  >
                    Borrow Book
                  </button>
                </>
              ) : null}
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
  connect(({ firestore: { ordered } }, props) => ({
    book: ordered.book && ordered.book[0]
  }))
)(BorrowBook);
