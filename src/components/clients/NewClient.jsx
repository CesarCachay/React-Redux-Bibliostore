import React, { Component } from "react";
import { Link } from "react-router-dom";

class NewClient extends Component {
  state = {
    first_name: "",
    last_name: "",
    career: "",
    code: ""
  };

  render() {
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/clients"} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> {""} Go back
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-user-plus"></i> {""} New Client
          </h2>

          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form>
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    placeholder="Cesar"
                    onChange={this.readData}
                    value={this.state.first_name}
                    required
                  />

                  <label>Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    placeholder="Cachay"
                    onChange={this.readData}
                    value={this.state.last_name}
                    required
                  />

                  <label>Career:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="career"
                    placeholder="Web Development"
                    onChange={this.readData}
                    value={this.state.career}
                    required
                  />

                  <label>Code:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="code"
                    placeholder="201320567"
                    onChange={this.readData}
                    value={this.state.code}
                    required
                  />
                </div>
                <input
                  type="submit"
                  value="Add client"
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

export default NewClient;
