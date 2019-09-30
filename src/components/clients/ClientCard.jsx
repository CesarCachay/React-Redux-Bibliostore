import React from "react";

const ClientCard = ({ user }) => {
  return (
    <div>
      <div className="card my-3">
        <h3 className="card-header bg-primary text-white mb-3">
          Client Information
        </h3>

        <div className="card body">
          <p className="font-weight-bold mt-3">
            Name: {""}
            <span className="font-weight-normal ">{user.first_name}</span>
          </p>
          <p className="font-weight-bold">
            Career: {""}
            <span className="font-weight-normal">{user.career}</span>
          </p>
          <p className="font-weight-bold">
            Code: {""}
            <span className="font-weight-normal">{user.code}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
