import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";

class EditClient extends Component {
  // Using refs
  firstNameInput = React.createRef();
  lastNameInput = React.createRef();
  careerInput = React.createRef();
  codeInput = React.createRef();

  updateClient = e => {
    e.preventDefault();

    // Create the object that will be updated
    const updatedClient = {
      first_name: this.firstNameInput.current.value,
      last_name: this.lastNameInput.current.value,
      career: this.careerInput.current.value,
      code: this.codeInput.current.value
    };

    const { client, firestore, history } = this.props;
    // Save in the DB of firestore

    firestore
      .update(
        {
          collection: "clients",
          doc: client.id
        },
        updatedClient
      )
      .then(() =>
        Swal.fire({
          position: "center",
          type: "success",
          title: "Student edited successfully",
          showConfirmButton: false,
          timer: 1500
        })
      )
      .then(history.push("/clients"));
  };

  render() {
    const { client } = this.props;

    if (!client) return <Spinner />;
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/clients"} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> {""} Go back
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-user"></i> {""} Edit Client
          </h2>

          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.updateClient}>
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    placeholder="Cesar"
                    ref={this.firstNameInput}
                    // In this case we use defaultValue instead of just value like in the component of
                    // NewClient in order that the user can write and React allows it
                    defaultValue={client.first_name}
                    required
                  />

                  <label>Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    placeholder="Cachay"
                    ref={this.lastNameInput}
                    defaultValue={client.last_name}
                    required
                  />

                  <label>Career:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="career"
                    placeholder="Web Development"
                    ref={this.careerInput}
                    defaultValue={client.career}
                    required
                  />

                  <label>Code:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="code"
                    placeholder="201320567"
                    ref={this.codeInput}
                    defaultValue={client.code}
                    required
                  />
                </div>
                <input
                  type="submit"
                  value="Edit Client"
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

export default compose(
  firestoreConnect(props => [
    {
      collection: "clients",
      storeAs: "client",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(EditClient);
