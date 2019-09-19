import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

class NewBook extends Component {
  state = {
    name: "",
    ISBN: "",
    editorial: "",
    quantity: ""
  };

  addNewBook = e => {
    e.preventDefault();
    // Get a copy of the state
    const newBook = this.state;
    // Here you will add a new key in the object of the state in this case will be lended
    newBook.lended = [];
    // Make a destructuring of the firestore
    const { firestore, history } = this.props;
    // Add in the DB of firestore and redirect
    firestore
      .add({ collection: "books" }, newBook)
      .then(() => history.push("/"));
  };

  readData = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to="/" className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> {""}
            Go back
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book"></i> {""}
            New Book
          </h2>

          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.addNewBook}>
                <div className="form-group">
                  <label>Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Title or Name of the book"
                    required
                    value={this.state.name}
                    onChange={this.readData}
                  />
                </div>

                <div className="form-group">
                  <label>ISBN:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ISBN"
                    placeholder="ISBN of the book"
                    required
                    value={this.state.ISBN}
                    onChange={this.readData}
                  />
                </div>

                <div className="form-group">
                  <label>Editorial:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="editorial"
                    placeholder="Editorial of the book"
                    required
                    value={this.state.editorial}
                    onChange={this.readData}
                  />
                </div>

                <div className="form-group">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    name="quantity"
                    placeholder="Quantity of the book"
                    required
                    value={this.state.quantity}
                    onChange={this.readData}
                  />
                </div>

                <input
                  type="submit"
                  value="Add New Book"
                  className="btn btn-success"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default firestoreConnect()(NewBook);
