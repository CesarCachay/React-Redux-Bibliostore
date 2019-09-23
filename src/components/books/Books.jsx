import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";

const Books = ({ books, firestore }) => {
  const deleteBook = id => {
    firestore.delete({ collection: "books", doc: id });
  };

  if (!books) return <Spinner />;
  return (
    <div className="row">
      <div className="col-12 mb-4">
        <Link to="/books/new" className="btn btn-success">
          <i className="fas fa-plus"></i> {""}
          New Book
        </Link>
      </div>
      <div className="col-md-8">
        <h2>
          <i className="fas fa-book"></i> {""}
          Books
        </h2>
      </div>

      <table className="table table-striped mt-4">
        <thead className="text-light bg-success">
          <tr>
            <th>Title</th>
            <th>ISBN</th>
            <th>Editorial</th>
            <th>Quantity</th>
            <th>Avaiable</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{book.ISBN}</td>
              <td>{book.editorial}</td>
              <td>{book.quantity}</td>
              <td>{book.quantity - book.lended.length}</td>
              <td>
                <Link
                  to={`/books/show/${book.id}`}
                  className="btn btn-success btn-block"
                >
                  <i className="fas fa-angle-double-right"></i> {""}
                  More Information
                </Link>
                <button
                  type="button"
                  className="btn btn-danger btn-block"
                  onClick={
                    () =>
                      Swal.fire({
                        title: "Are you sure?",
                        text: "Do you really want to delete this book?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                      }).then(result => {
                        if (result.value) {
                          deleteBook(book.id);
                          Swal.fire(
                            "Deleted!",
                            "The book has been deleted.",
                            "success"
                          );
                        }
                      })
                    // .then(() => deleteBook(book.id))
                  }
                >
                  <i className="fas fa-trash-alt"></i> {""}
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default compose(
  firestoreConnect([{ collection: "books" }]),
  connect((state, props) => ({
    books: state.firestore.ordered.books
  }))
)(Books);
