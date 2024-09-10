import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../Assets/Images/nav-logo.png"
import profile from "../Assets/Images/Avatar.png"
import { BiMenuAltLeft } from "react-icons/bi";

function NavMenu() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [navBackground, setNavBackground] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    setUser(user);
  }, []);

  const navigate = useNavigate();

const gotoProfile =()=>{

}

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (user) {
    return (
      <>
    

        <Navbar
          collapseOnSelect
          expand="lg"
          bg="light"
          variant="light"
          sticky="top"
          style={{
            transition: "1s ease",
            color: "black",
            backgroundColor: navBackground ? "white" : "white",
          }}
        >
          <Container>
            <Navbar.Brand to="/">
              <img
                src={logo}
                className="me-5"
                height={50}
                width={100}
                alt="app logo"
              />
            </Navbar.Brand>
           
            <Navbar.Collapse id="responsive-navbar-nav">
              
            <Nav className="me-auto">
                  <NavLink className="me-2 nav-link-item" text-start to="/">
                  </NavLink>

                  <NavLink to="/contact" className="me-4 nav-link-item">
                  </NavLink>
                </Nav>
              <Nav>
              <img src={profile} style={{ height: "35px" }} alt="" />
                <NavDropdown
                  title="Profile"
                  id="profile-dropdown"
                  onClick={gotoProfile}
                  className="nav-link-item"
                  style={{ background: "#f8f9fa", color: "#333"}}
                >
                  <NavDropdown.Item onClick={gotoProfile}>
                    <img src={profile} style={{ height: "15px" }} alt="" />
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>
                    <img style={{ height: "15px" }} alt="" />
                     Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default NavMenu;
