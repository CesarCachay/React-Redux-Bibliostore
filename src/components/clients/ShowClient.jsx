import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";
// In case I don't want to use an ternary operator in the return I could put the following
// if(!client) return <Spinner/>

const ShowClient = ({ client }) => {
  return (
    <>
      {!client ? (
        <Spinner />
      ) : (
        <>
          <div className="row">
            <div className="col-md-6 mb-4">
              <Link to="/clients" className="btn btn-secondary">
                <i className="fas fa-arrow-circle-left"></i> {""}
                Go back
              </Link>
            </div>

            <div className="col-md-6">
              <Link
                to={`/clients/edit/${client.id}`}
                className="btn btn-primary float-right"
              >
                <i className="fas fa-pencil-alt"></i> {""}
                Edit Client
              </Link>
            </div>

            <hr className="mx-5 w-100" />

            <div className="col-12">
              <h2 className="mb-4">
                {client.first_name} {client.last_name}
              </h2>
              <p>
                <span className="font-weight-bold">Career:</span> {""}
                {client.career}
              </p>
              <p>
                <span className="font-weight-bold">Code:</span> {""}
                {client.code}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

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
)(ShowClient);
