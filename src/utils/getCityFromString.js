export const getCity = (str) => {
  if (typeof str !== "string") return "type Error";
  return str.split(",")[1]?.trim();
};
