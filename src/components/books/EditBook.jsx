import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

class EditBook extends Component {
  nameInput = React.createRef();
  isbnInput = React.createRef();
  editorialInput = React.createRef();
  quantityInput = React.createRef();

  updateBook = e => {
    e.preventDefault();

    // Create the new object updated
    const updatedBook = {
      name: this.nameInput.current.value,
      ISBN: this.isbnInput.current.value,
      editorial: this.editorialInput.current.value,
      quantity: this.quantityInput.current.value
    };

    const { firestore, book, history } = this.props;

    firestore
      .update(
        {
          collection: "books",
          doc: book.id
        },
        updatedBook
      )
      .then(() =>
        Swal.fire({
          position: "center",
          type: "success",
          title: "The book has been updated",
          showConfirmButton: false,
          timer: 1500
        })
      )
      .then(history.push("/"));
  };

  render() {
    const { book } = this.props;
    if (!book) return <Spinner />;

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/"} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> {""} Go back
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-user"></i> {""} Edit Book
          </h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 mt-5">
            <form onSubmit={this.updateBook}>
              <div className="form-group">
                <label>Book Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="La ciudad y los perros"
                  ref={this.nameInput}
                  // In this case we use defaultValue instead of just value like in the component of
                  // NewClient in order that the user can write and React allows it
                  defaultValue={book.name}
                  required
                />

                <div className="form-group">
                  <label>ISBN Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ISBN"
                    placeholder="213123123-12412412"
                    ref={this.isbnInput}
                    defaultValue={book.ISBN}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Editorial Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="editorial"
                    placeholder="Codeibol"
                    ref={this.editorialInput}
                    defaultValue={book.editorial}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Available:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="quantity"
                    placeholder="10"
                    ref={this.quantityInput}
                    defaultValue={book.quantity}
                    required
                  />
                </div>
              </div>
            </form>
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
)(EditBook);
