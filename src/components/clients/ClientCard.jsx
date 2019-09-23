import React from "react";

const ClientCard = ({ result }) => {
  return (
    <div>
      <div className="card my-3">
        <h3 className="card-header bg-primary text-white">
          Client Information
        </h3>

        <div className="card body">
          <p className="font-weight-bold">
            Name: {""}
            <span className="font-weight-normal">{result.first_name}</span>
          </p>
          <p className="font-weight-bold">
            Career: {""}
            <span className="font-weight-normal">{result.career}</span>
          </p>
          <p className="font-weight-bold">
            Code: {""}
            <span className="font-weight-normal">{result.code}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
