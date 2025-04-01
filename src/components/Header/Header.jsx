import { NavLink } from "react-router-dom";
import sprite from "../../assets/sprite.svg";
import s from "./Header.module.css";
import clsx from "clsx";

const linkNav = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Header = () => {
  return (
    <header className={s.header}>
      <NavLink to="/">
        <svg className={s.logo}>
          <use href={`${sprite}#icon-logo`} />
        </svg>
      </NavLink>
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
