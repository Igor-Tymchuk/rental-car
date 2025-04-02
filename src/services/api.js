import axios from "axios";
axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export const getBrands = async () => {
  const response = await axios(`brands`);
  return response.data;
};

export const getCars = async ({
  brand,
  rentalPrice,
  minMileage,
  maxMileage,
  limit,
  page,
}) => {
  const response = await axios(`cars`, {
    params: { brand, rentalPrice, minMileage, maxMileage, limit, page },
  });
  return response.data;
};
