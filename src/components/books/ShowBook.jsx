import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";

class ShowBook extends Component {
  returnBook = id => {
    const { firestore, book } = this.props;
    const updatedBook = { ...this.props.book };
    const returnedBook = book.lended.filter(element => element.code !== id);
    updatedBook.lended = returnedBook;

    firestore.update(
      {
        collection: "books",
        doc: updatedBook.id
      },
      updatedBook
    );
  };

  render() {
    const { book } = this.props;
    if (!book) return <Spinner />;

    return (
      <div className="row">
        <div className="col-md-6 mb-4">
          <Link to="/" className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> {""}
            Go Back
          </Link>
        </div>
        <div className="col-md-6 mb-4">
          <Link
            to={`/books/edit/${book.id}`}
            className="btn btn-primary float-right"
          >
            <i className="fas fa-pencil-alt"></i> {""}
            Edit Book
          </Link>
        </div>

        <hr className="mx-5 w-100" />

        <div className="col-12">
          <h2 className="mb-4">{book.name}</h2>

          <p>
            <span className="font-weight-bold">ISBN:</span> {""}
            {book.ISBN}
          </p>
          <p>
            <span className="font-weight-bold">Editorial:</span> {""}
            {book.editorial}
          </p>
          <p>
            <span className="font-weight-bold">Quantity:</span> {""}
            {book.quantity}
          </p>
          <p>
            <span className="font-weight-bold">Available:</span> {""}
            {book.quantity - book.lended.length}
          </p>
          {/* Button to lend a book */}
          {book.quantity - book.lended.length > 0 ? (
            <Link
              to={`/books/borrow/${book.id}`}
              className="btn btn-success my-3"
            >
              Lend a Book
            </Link>
          ) : null}
          <h3 className="my-2">Students with this book:</h3>
          {book.lended.map(student => (
            <div className="card my-2" key={student.code}>
              <h4 className="card-header">
                {student.first_name} {student.last_name}
              </h4>
              <div className="card-body">
                <p>
                  <span className="font-weight-bold">Student Code:</span>{" "}
                  {student.code}
                </p>
                <p>
                  <span className="font-weight-bold">Student Career:</span>{" "}
                  {student.career}
                </p>
                <p>
                  <span className="font-weight-bold">Date of Submission:</span>{" "}
                  {student.lend_date}
                </p>
              </div>

              <div className="card-footer">
                <button
                  type="button"
                  className="btn btn-info font-weight-bold"
                  onClick={() =>
                    Swal.fire({
                      title: "Are you sure?",
                      text: "This book where returned?",
                      type: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes"
                    }).then(result => {
                      if (result.value) {
                        this.returnBook(student.code);
                        Swal.fire(
                          "Returned!",
                          "The book has been returned.",
                          "success"
                        );
                      }
                    })
                  }
                >
                  Return Book
                </button>
              </div>
            </div>
          ))}
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
)(ShowBook);
