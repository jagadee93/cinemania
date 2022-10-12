import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { FaUserAstronaut } from 'react-icons/fa';
     

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Users from "../Users";



export default function NavBar() {
  const { auth } = useAuth();
  console.log(auth.roles)
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Navbar className="navabar" bg="dark" expand="lg">
    <Container fluid>
      <Link className="navLink" to="/" >Roll review</Link>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Link className="navLink" to="/">Home</Link>
          <Link className="navLink" to="/addmovie">
            AddMovie
          </Link>
          {auth.user?<Link className="navLink" onClick={signOut} to="/">Logout</Link>:<Link className="navLink" to="/login">Login</Link>}
          {auth?.roles?.includes(5150)?
          <Link className="navLink" to="/admin">PendingMovies</Link>
          :auth?.roles?.includes(1984)?<div><h4 className="nav-text">Critic</h4></div>
          :auth?.roles?.includes(2001)?<div><h4 className="nav-text">viewer</h4></div>
          :<Link className="navLink" to="/register">Register</Link>}
          </Nav>
        <span style={{ }} className={'profile'}>
        {
  auth?.roles?.includes(5150) ? (
    <Link to={"/users"}>
      {" "}
      {auth.user + " "} <FaUserAstronaut />
    </Link>
  ) : auth?.user ? (
    <Link to={"/profile"}>
      {auth.user + " "} <FaUserAstronaut />
    </Link>
  ) : (
    <Link to={"/login"}>
      {" "}
      <FaUserAstronaut />
    </Link>
  )
}
      </span>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}
