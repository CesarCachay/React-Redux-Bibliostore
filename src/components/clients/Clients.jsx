import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";

const Clients = ({ clients, firestore }) => {
  const deleteClient = id => {
    firestore.delete({
      collection: "clients",
      doc: id
    });
  };

  return (
    <>
      {!clients ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col-md-12 mb-4">
            <Link to="/clients/new" className="btn btn-primary">
              <i className="fas fa-plus"></i> {""} New Client
            </Link>
          </div>
          <div className="div col-md-8">
            <h2>
              <i className="fas fa-users"></i>Clients
            </h2>
          </div>

          <table className="table table-striped mt-4">
            <thead className="text-light bg-primary">
              <tr>
                <th>Name</th>
                <th>Career</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td className="text-dark">
                    {client.first_name} {client.last_name}
                  </td>
                  <td className="text-dark">{client.career}</td>
                  <td>
                    <Link
                      to={`/clients/show/${client.id}`}
                      className="btn btn-primary btn-block"
                    >
                      <i className="fas fa-angle-double-right"></i> {""}More
                      information
                    </Link>

                    <button
                      type="button"
                      className="btn btn-danger btn-block"
                      onClick={() =>
                        Swal.fire({
                          title: "Are you sure?",
                          text: "Do you really want to delete this book?",
                          type: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!"
                        })
                          .then(result => {
                            if (result.value) {
                              Swal.fire(
                                "Deleted!",
                                "The book has been deleted.",
                                "success"
                              );
                            }
                          })
                          .then(() => deleteClient(client.id))
                      }
                    >
                      <i className="fas fa-trash-alt"></i> {""} Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect((state, props) => ({ clients: state.firestore.ordered.clients }))
)(Clients);
