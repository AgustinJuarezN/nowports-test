import React from "react";
import { useSession } from "react-session-persist";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  let history = useHistory();
  const { authenticated, removeSession, user } = useSession();

  const logout = async () => {
    removeSession();
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item mr-2">
            <Link to="/">Home</Link>
          </li>
          {authenticated && (
            <li className="nav-item">
              <Link to="/me/contact-book">Contact Book</Link>
            </li>
          )}
        </ul>
        <form className="form-inline my-2 my-lg-0">
          {!authenticated ? (
            <>
              <Link to="/register" className="text-white">
                <button
                  className="btn btn-outline-success my-2 my-sm-0 mr-3 p-2"
                  style={button}
                  type="button"
                >
                  Register
                </button>
              </Link>

              <Link to="/login" className="text-white">
                <button
                  className="btn btn-outline-success my-2 my-sm-0 p-2"
                  style={button}
                  type="button"
                >
                  Login
                </button>
              </Link>
            </>
          ) : (
            <>
              <a className="nav-link" href="/home">
                {user && user.firstname}
              </a>
              <a className="text-white" onClick={logout}>
                <button
                  className="btn btn-outline-success my-2 my-sm-0 p-2"
                  style={button}
                  type="button"
                >
                  Logout
                </button>
              </a>
            </>
          )}
        </form>
      </div>
    </nav>
  );
};

const button = {
  backgroundColor: "#FF9003",
  borderRadius: "25px",
  border: "none",
};

export default Navbar;
