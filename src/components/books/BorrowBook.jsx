import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";

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
        const getData = result.docs[0];
        this.setState({ result: getData.data(), noResults: false });
      }
    });
  };

  readData = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { book } = this.props;

    if (!book) return <Spinner />;

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
              <form onSubmit={this.searchClient}>
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
