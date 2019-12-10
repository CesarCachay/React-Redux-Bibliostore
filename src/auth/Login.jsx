import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  readData = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  LoginUser = e => {
    e.preventDefault();
    const { firebase } = this.props;
    const { email, password } = this.state;

    firebase
      .login({
        email: email,
        password: password
      })
      .then(response => console.log("You are logged in successfully"))
      .catch(error => console.log("There was an error"));
  };

  render() {
    let userNotFound = "";
    const { firebase } = this.props;

    if (firebase.login.catch) {
      userNotFound = (
        <div className="alert alert-danger text-center font-weight-bold">
          Email or password incorrect
        </div>
      );
    } else {
      userNotFound = null;
    }

    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="text-center py-4">
                <i className="fas fa-lock"></i> {""}
                Login
              </h2>

              <form onSubmit={this.LoginUser}>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.readData}
                  />
                </div>

                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.readData}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-success btn-block"
                  value="Log in"
                />
              </form>
              {userNotFound}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default firebaseConnect()(Login);
