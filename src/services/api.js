import axios from "axios";
axios.defaults.baseURL = "https://car-rental-api.goit.global/";

// const searchMovie = async (query, page = 1) => {
//   if (!query) return console.log("Query is empty!");
//   const response = await axios(`search/movie`, {
//     ...options,
//     params: { ...options.params, include_adult: false, query, page },
//   });
//   return response.data;
// };

export const getBrands = async () => {
  const response = await axios(`brands`);
  return response.data;
};
