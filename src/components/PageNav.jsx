import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import { Logo } from "./Logo";

export const PageNav = () => {
  return (
    <div>
      <nav className={styles.nav}>
        <Logo />
        <ul>
          <li>
            <NavLink to="/">home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/Product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/Login" className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
