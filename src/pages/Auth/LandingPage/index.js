import React from "react";
import "./landingPage.scss";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="header-section">
        <Navbar
          bg="transparent"
          variant="light"
          expand="lg"
          className="d-none d-md-flex"
        >
          <Navbar.Brand>
            <Link to="/">
              <img alt="logo" className="brand_logo " src="/logo-square.png" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>ABOUT</Nav.Link>
              <Nav.Link>SERVICES</Nav.Link>
              <Nav.Link>LEARN</Nav.Link>
            </Nav>
            <ul className="button-wrapper">
              <Link className="login" to="/login">
                <span>LOG IN</span>
              </Link>
              <Link className="get-started" to="/sign-up">
                <span>GET STARTED</span>
              </Link>
            </ul>
          </Navbar.Collapse>
        </Navbar>
        <Navbar
          bg="light"
          expand="lg"
          className="header d-flex d-md-none w-100"
        >
          <Navbar.Brand>
            <Link to="/">
              <img alt="logo" className="brand_logo " src="/logo-square.png" />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>ABOUT</Nav.Link>
              <Nav.Link>SERVICES</Nav.Link>
              <Nav.Link>LEARN</Nav.Link>
            </Nav>
            <ul className="button-wrapper">
              <Link className="login" to="/login">
                <span>LOG IN</span>
              </Link>
              <Link className="get-started" to="/sign-up">
                <span>GET STARTED</span>
              </Link>
            </ul>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="position-relative">
        <div className="full-screen">
          <div className="background"></div>
          <div className="overlay" />
        </div>
        <div className="container">
          <div className="row">
            <div className="header-text-section text-center">
              <div className="header-title">
                <h1>Personal Identity</h1>
                <h3>Your Business line </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
