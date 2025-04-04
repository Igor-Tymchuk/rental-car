export const arrayToSelectObj = (array) =>
  array.map((item) => ({
    value: item.toLowerCase().replace(/\s+/g, " "),
    label: item,
  }));
