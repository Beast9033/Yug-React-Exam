// import React from "react";
import logo from "../assets/blogtyrant-logo.png";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <span>
              <img src={logo} alt="logo" />
            </span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            ariaControls="navbarSupportedContent"
            ariaExpanded="false"
            ariaLabel="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link " href="/">
                  <span>WHO?</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span>UPDATES</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span>TOOLS</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span>BEST OF</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/CreatePost">
                  <span>THE BLOG</span>
                </a>
              </li>
            </ul>

            <button className="btn btn-outline-warning" type="submit">
              <a
                href="/CreatePost"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                ★ STARTING A NEW BLOG?
              </a>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
