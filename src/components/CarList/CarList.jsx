import { useEffect, useState } from "react";
import CarItem from "../CarItem/CarItem";
import s from "./CarList.module.css";
import { getCars } from "../../services/api";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
const CarList = () => {
  const [cars, setCars] = useState(null);

  useEffect(() => {
    const fetchCars = async (params) => {
      try {
        const response = await getCars(params);
        setCars(response);
        return response;
      } catch (e) {
        console.log(e);
      }
    };
    fetchCars({
      brand: "",
      rentalPrice: "",
      minMileage: "",
      maxMileage: "",
      limit: 8,
      page: 1,
    });
  }, []);
  return (
    cars && (
      <>
        <ul className={s.list}>
          {cars.cars.map((car) => (
            <li key={car.id}>
              <CarItem car={car} />
            </li>
          ))}
        </ul>
        {cars.totalPages > cars.page && <LoadMoreBtn />}
      </>
    )
  );
};
export default CarList;
