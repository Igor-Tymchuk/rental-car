import { Link } from "react-router-dom";
import s from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={s.section}>
      <h1 className={s.title}>Find your perfect rental car</h1>
      <h2 className={s.subtitle}>
        Reliable and budget-friendly rentals for any journey
      </h2>
      <Link className={s.button} to="catalog">
        View Catalog
      </Link>
    </section>
  );
};
export default Hero;
