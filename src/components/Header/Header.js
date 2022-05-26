import "./Header.css";
import React from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import auth from "../firebase.init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let from = navigate?.state?.from?.pathname || "/login";
  const [authUser] = useAuth();
  const handleSignOut = () => {
    signOut(auth);
    navigate(from);
  };
  return (
    <div
      className={
        pathname === "/" ||
          pathname === "/login" ||
          pathname === "/sign-up" ||
          pathname === "/blogs" ||
          pathname === "/dashboard" ||
          pathname === "/dashboard/add-review" ||
          pathname === "/dashboard/my-orders" ||
          pathname === "/dashboard/my-profile" ||
          pathname === "/dashboard/manage-orders" ||
          pathname === "/dashboard/manage-product" ||
          pathname === "/dashboard/make-admin" ||
          pathname === "/dashboard/add-product" ||
          pathname === "/all-products" ||
          pathname === "/portfolio" ||
          pathname === "/payment" ||
          pathname === "/inventory" ||
          pathname === "/edit-profile" ||
          pathname === "/contact"
          ? `d-block navbar`
          : `d-none`
      }

    >
      <div className="bg-primary text-info">
        <div className="bg-primary text-info pt-4 navbar-container navbar-mobile">
          <Navbar className="navbar-bg" collapseOnSelect expand="lg">
            <Container>
              <Navbar.Brand as={Link} to="/">
                <span className='text-dark'> Computer Parts Manufacturer</span>
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-auto">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active-link mx-2` : `inactive-link mx-2`
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active-link mx-2` : `inactive-link mx-2`
                    }
                    to="/all-products"
                  >
                    Products
                  </NavLink>
                  <span>
                    {authUser && (
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? `active-link mx-2` : `inactive-link mx-2`
                        }
                        to="/dashboard"
                      >
                        Dashboard
                      </NavLink>
                    )}
                  </span>

                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active-link mx-2` : `inactive-link mx-2`
                    }
                    to="/blogs"
                  >
                    Blogs
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active-link mx-2` : `inactive-link mx-2`
                    }
                    to="/portfolio"
                  >
                    My Portfolio
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active-link mx-2` : `inactive-link mx-2`
                    }
                    to="/contact"
                  >
                    Contact Us
                  </NavLink>
                </Nav>
                <Nav>
                  {authUser ? (
                    <span>
                      <span className="px-4 user-name">
                        Hello, {authUser.displayName}
                      </span>
                      <button
                        className="btn sign-out-btn"
                        onClick={handleSignOut}
                      >
                        Sign Out
                        <FontAwesomeIcon
                          className="ms-2"
                          icon={faRightFromBracket}
                        />
                      </button>
                    </span>
                  ) : (
                    <NavLink className="mx-2 login-btn" to="/login">
                      Login
                    </NavLink>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    </div>
  );
};

export default Header;