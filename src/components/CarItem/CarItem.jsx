import { Link } from "react-router-dom";
import sprite from "../../assets/sprite.svg";
import s from "./CarItem.module.css";
import { getCity } from "../../utils/getCityFromString";
import { getCountry } from "../../utils/getCountryFromString";
import { divideNumber } from "../../utils/numberDivider";
import { selectFavorite } from "../../redux/favorite/selectors";
import { useDispatch, useSelector } from "react-redux";
import { changeFavorite } from "../../redux/favorite/slice";

const CarItem = ({ car }) => {
  const favorite = useSelector(selectFavorite);
  const liked = Boolean(favorite.includes(car?.id));
  const dispatch = useDispatch();

  const toggleFavorite = (id) => {
    dispatch(changeFavorite(id));
  };

  return (
    <div className={s.box}>
      <img src={car?.img} alt={car?.description} className={s.img} />
      <svg
        className={s.favourite}
        onClick={() => {
          toggleFavorite(car?.id);
        }}
      >
        <use href={liked ? `${sprite}#icon-liked` : `${sprite}#icon-like`} />
      </svg>
      <div className={s.title}>
        <h3 className={s.carName}>
          {car?.brand} <span className={s.model}>{car?.model}</span>,{" "}
          {car?.year}
        </h3>
        <p className={s.price}>${car?.rentalPrice}</p>
      </div>
      <div className={s.details}>
        <p className={s.address}>
          <span>
            {car?.address && getCity(car.address)}
            &nbsp;&nbsp;|&nbsp;&nbsp;
          </span>
          <span>
            {car?.address && getCountry(car.address)}
            &nbsp;&nbsp;|&nbsp;&nbsp;
          </span>
          <span>{car?.rentalCompany}&nbsp;&nbsp;|</span>
        </p>
        <p className={s.tech}>
          <span>{car?.type}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <span>{car?.mileage && divideNumber(car?.mileage)} km</span>
        </p>
      </div>
      <Link className={s.button} to={`/catalog/${car.id}`}>
        Read more
      </Link>
    </div>
  );
};
export default CarItem;
