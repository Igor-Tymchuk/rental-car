import { useParams } from "react-router-dom";
import RentalForm from "../RentalForm/RentalForm";
import s from "./CarDetails.module.css";
import { useEffect, useState } from "react";
import { getCarDetails } from "../../services/api";
import { getCity } from "../../utils/getCityFromString";
import { getCountry } from "../../utils/getCountryFromString";
import { divideNumber } from "../../utils/numberDivider";
import sprite from "../../assets/sprite.svg";
import HoverHighlight from "../HoverHighlight/HoverHighlight";
const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  useEffect(() => {
    const fetchCarDetails = async (id) => {
      try {
        const response = await getCarDetails(id);
        setCar(response);
        return response;
      } catch (e) {
        console.log(e);
      }
    };
    fetchCarDetails(id);
  }, [id]);
  return (
    car && (
      <div className={s.box}>
        <div className={s.leftBlock}>
          <img className={s.img} src={car?.img} alt={car?.description} />
          <RentalForm id={car?.id} />
        </div>
        <div className={s.rightBlock}>
          <h2 className={s.title}>
            {car?.brand} {car?.model}, {car?.year}
            <span className={s.id}>
              <HoverHighlight id={car?.id} />
            </span>
          </h2>

          <p className={s.address}>
            {" "}
            <svg className={s.icon}>
              <use href={`${sprite}#icon-location`} />
            </svg>
            {getCity(car?.address)}, {getCountry(car?.address)}
            <span>Mileage: {divideNumber(car?.mileage)} km</span>
          </p>
          <p className={s.price}>${car?.rentalPrice}</p>
          <p className={s.description}>{car?.description}</p>
          <h3 className={s.subtitle}>Rental Conditions:</h3>
          <ul className={s.list}>
            {car?.rentalConditions.map((condition, index) => (
              <li key={index + 1} className={s.listItem}>
                <svg className={s.icon}>
                  <use href={`${sprite}#icon-check`} />
                </svg>
                {condition}
              </li>
            ))}
          </ul>
          <h3 className={s.subtitle}>Car Specifications:</h3>
          <ul className={s.list}>
            <li className={s.listItem}>
              <svg className={s.icon}>
                <use href={`${sprite}#icon-calendar`} />
              </svg>
              Year: {car?.year}
            </li>
            <li className={s.listItem}>
              <svg className={s.icon}>
                <use href={`${sprite}#icon-car`} />
              </svg>
              Type: {car?.type}
            </li>
            <li className={s.listItem}>
              <svg className={s.icon}>
                <use href={`${sprite}#icon-fuel-pump`} />
              </svg>
              Fuel Consumption: {car?.fuelConsumption}
            </li>
            <li className={s.listItem}>
              <svg className={s.icon}>
                <use href={`${sprite}#icon-gear`} />
              </svg>
              Engine Size: {car?.engineSize}
            </li>
          </ul>
          <h3 className={s.subtitle}>Accessories and functionalities:</h3>
          <ul>
            {car?.accessories
              .concat(car?.functionalities)
              .map((accessory, index) => (
                <li key={index + 1} className={s.listItem}>
                  <svg className={s.icon}>
                    <use href={`${sprite}#icon-check`} />
                  </svg>
                  {accessory}
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
  );
};
export default CarDetails;
