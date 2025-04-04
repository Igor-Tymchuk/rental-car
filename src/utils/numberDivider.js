export const divideNumber = (number) => {
  if (typeof number !== "number") return "type Error";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
