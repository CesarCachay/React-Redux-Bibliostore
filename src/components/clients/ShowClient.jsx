import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";

const ShowClient = () => {
  return (
    <div>
      <h1>I'm showing an specific client</h1>
    </div>
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
