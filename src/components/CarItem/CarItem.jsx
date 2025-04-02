import { Link } from "react-router-dom";
import sprite from "../../assets/sprite.svg";
import s from "./CarItem.module.css";

const CarItem = ({ car }) => {
  const liked = true;
  return (
    <div className={s.box}>
      <img src={car?.img} alt={car?.description} className={s.img} />
      <svg className={s.favourite}>
        <use href={liked ? `${sprite}#icon-liked` : `${sprite}#icon-like`} />
      </svg>
      <div className={s.title}>
        <h3>
          {car?.brand} <span className={s.model}>{car?.model}</span>,{" "}
          {car?.year}
        </h3>
        <p className={s.price}>${car?.rentalPrice}</p>
      </div>
      <div className={s.details}>
        <p className={s.address}>
          <span>
            {car?.address && car?.address.split(",")[1]?.trim()}
            &nbsp;&nbsp;|&nbsp;&nbsp;
          </span>
          <span>
            {car?.address && car?.address.split(",")[2]?.trim()}
            &nbsp;&nbsp;|&nbsp;&nbsp;
          </span>
          <span>{car?.rentalCompany}&nbsp;&nbsp;|</span>
        </p>
        <p className={s.tech}>
          <span>{car?.type}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <span>
            {car?.mileage &&
              car?.mileage
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
            km
          </span>
        </p>
      </div>
      <Link className={s.button}>Read more</Link>
    </div>
  );
};
export default CarItem;
