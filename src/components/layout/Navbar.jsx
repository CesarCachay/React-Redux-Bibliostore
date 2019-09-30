import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

class Navbar extends Component {
  state = {
    isAuthenticated: false
  };

  //Get the props automatically
  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  LogoutUser = () => {
    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
        <nav className="navbar navbar-light">
          <Link to={"/"}>
            <span className="navbar-brand mb-0 h1">Bibliostore Manager</span>
          </Link>
        </nav>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          {isAuthenticated ? (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/clients"} className="nav-link">
                  Clients
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Books
                </Link>
              </li>
            </ul>
          ) : null}
          {isAuthenticated ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-">
                <a href="#!" className="nav-link mt-2">
                  {auth.email}
                </a>
              </li>
              <li className="nav-link">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={this.LogoutUser}
                >
                  Log out
                </button>
              </li>
            </ul>
          ) : null}
        </div>
      </nav>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar);
