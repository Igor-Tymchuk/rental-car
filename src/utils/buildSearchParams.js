export const buildSearchParams = (paramsObj) => {
  const result = {};

  Object.entries(paramsObj).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      result[key] = value.toString();
    }
  });

  return result;
};
