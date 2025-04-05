import { useEffect, useRef } from "react";
import CarItem from "../CarItem/CarItem";
import s from "./CarList.module.css";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { useSearchParams } from "react-router-dom";
import {
  selectItems,
  selectPage,
  selectTotalPages,
} from "../../redux/cars/selectors";
import { getCars } from "../../redux/cars/operations";
import { useDispatch, useSelector } from "react-redux";
const CarList = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectItems);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const [searchParams, setSearchParams] = useSearchParams();

  const loadMore = () => {
    const newParamsObject = {
      ...Object.fromEntries(searchParams.entries()),
      page: Number(page) + 1,
    };
    setSearchParams(newParamsObject);
    dispatch(getCars(newParamsObject));
  };

  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current || cars.length > 0) return;
    didFetch.current = true;
    const params = {
      ...Object.fromEntries(searchParams.entries()),
      limit: 8,
    };
    setSearchParams(params);
    dispatch(getCars(params));
  }, [cars.length, dispatch, searchParams, setSearchParams]);
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
        {totalPages > page && <LoadMoreBtn loadMore={loadMore} />}
      </>
    )
  );
};
export default CarList;
