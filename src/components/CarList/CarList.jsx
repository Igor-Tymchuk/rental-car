import { useEffect, useState } from "react";
import CarItem from "../CarItem/CarItem";
import s from "./CarList.module.css";
import { getCars } from "../../services/api";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { useSearchParams } from "react-router-dom";
const CarList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState(null);
  const [pages, setPages] = useState({ page: null, totalPages: null });

  const loadMore = () => {
    const fetchCars = async (params) => {
      try {
        const response = await getCars(params);
        setCars((prev) => [...(prev || []), ...response.cars]);
        setPages({ page: response.page, totalPages: response.totalPages });
        return response;
      } catch (e) {
        console.log(e);
      }
    };
    const newParamsObject = {
      ...Object.fromEntries(searchParams.entries()),
      page: Number(pages.page) + 1,
    };
    setSearchParams(newParamsObject);
    fetchCars(newParamsObject);
  };

  useEffect(() => {
    if (cars !== null) return;
    const fetchCars = async (params) => {
      try {
        const response = await getCars(params);
        setCars(response.cars);
        setPages({ page: response.page, totalPages: response.totalPages });
        return response;
      } catch (e) {
        console.log(e);
      }
    };
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      limit: 8,
    });
    fetchCars({ ...Object.fromEntries(searchParams.entries()), limit: 8 });
  }, [cars, searchParams, setSearchParams]);
  return (
    cars && (
      <>
        <ul className={s.list}>
          {cars.map((car) => (
            <li key={car.id}>
              <CarItem car={car} />
            </li>
          ))}
        </ul>
        {pages.totalPages > pages.page && <LoadMoreBtn loadMore={loadMore} />}
      </>
    )
  );
};
export default CarList;
