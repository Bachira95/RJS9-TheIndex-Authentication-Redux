import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";

//Actions
import { logout } from "./redux/actions";

// Logo
import logo from "./assets/theindex.svg";

const Sidebar = ({ user, logout }) => (
  <div id="sidebar">
    <img src={logo} className="logo" alt="the index logo" />
    <section>
      <h4 className="menu-item active">
        <NavLink to="/authors">AUTHORS</NavLink>
      </h4>
    </section>
    <div className="fixed-bottom">
      {/* if there is a user/looged in display the logout  */}

      {!user ? (
        <div>
          <Link to="/login" className="btn btn-info m-2 float-left">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success m-2 float-left">
            Signup
          </Link>
        </div>
      ) : (
        <button className="btn btn-danger m-2 float-left" onClick={logout}>
          Logout {user.username}
        </button>
      )}
    </div>
  </div>
);

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
