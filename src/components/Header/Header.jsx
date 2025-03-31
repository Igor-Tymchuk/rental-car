import { NavLink } from "react-router-dom";
import sprite from "../../assets/sprite.svg";
import s from "./Header.module.css";

const linkNav = ({ isActive }) => {
  return isActive && s.active;
};

const Header = () => {
  return (
    <header className={s.header}>
      <svg className={s.logo}>
        <use href={`${sprite}#icon-logo`} />
      </svg>
      <nav className={s.nav}>
        <NavLink className={linkNav} to="/">
          Home
        </NavLink>
        <NavLink className={linkNav} to="/catalog">
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};
export default Header;
