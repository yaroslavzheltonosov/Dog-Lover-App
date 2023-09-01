import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DogContext } from "../App";
import useLogout from "../services/useLogout";

import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const context = useContext(DogContext);
  const { stateContext: { loggedIn } } = context;

  const isFavoritePage = window.location?.pathname === "/favorite";
  const isHomePage = window.location?.pathname === "/home";

  const request = useLogout();
  const handleLogout = () => {
    request.handleLogout();
  };

  return (
    <nav className={styles.Navbar}>
      <div className={styles.NavbarContainer}>
        <div className={styles.NavbarBrand}>
          <img src="235405.png" alt="Dog" className={styles.BrandImage} />
          <span className={styles.BrandText}>Dog Lover App</span>
        </div>
        <ul className={styles.Menu}>
          {!isFavoritePage && (
            <li>
              <Link to='/favorite' className={styles.NavLink}>Favorite Dogs</Link>
            </li>
          )}
          {!isHomePage && (
            <li>
              <Link to='/home' className={styles.NavLink}>Home</Link>
            </li>
          )}
          <li>
            {loggedIn ? (
              <Link to='/' className={styles.NavLink} onClick={handleLogout}>Logout</Link>) : (
              <Link to='/' className={styles.NavLink}>Login</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
