export const getCountry = (str) => {
  if (typeof str !== "string") return "type Error";
  return str.split(",")[2]?.trim();
};
