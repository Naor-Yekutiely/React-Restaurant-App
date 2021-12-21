import React, { useState } from "react";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import "../../Components/Navbar/Navbar.css";
import Dropdown from "../Dropdown/Dropdown";

// This component is the main application NavBar that has all the links to go between pages and also to display the sign in and dropdwon components

function Navbar({ handelSigninClicked, isManager, isClient }) {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const handleloginClick = () => {
    handelSigninClicked();
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          delicious
          <i className="fas fa-utensils"></i>
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li
            className={isManager ? "dont-show" : "nav-item"}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to="/Checkout"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              <i className="fas fa-shopping-cart"></i>
              <span className="shopping-count">
                {localStorage.menu
                  ? JSON.parse(localStorage.menu).numofselected
                  : "0"}
              </span>
            </Link>

            {dropdown && <Dropdown />}
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/menu" className="nav-links" onClick={closeMobileMenu}>
              Menu
            </Link>
          </li>
          <li
            className={
              JSON.parse(localStorage.getItem("user")) &&
              JSON.parse(localStorage.getItem("user")).id === ""
                ? "dont-show"
                : "nav-item"
            }
          >
            <Link
              to="/activeorders"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Active Orders
            </Link>
          </li>
          <li className="button-sign-in" onClick={handleloginClick}>
            <Button
              bgtext={isManager || isClient ? "Logout" : "Sign In!"}
              smtext={
                isManager || isClient
                  ? "Hi " + JSON.parse(localStorage.getItem("user")).id
                  : ""
              }
              width="120px"
              height="55px"
              link="/"
            />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
