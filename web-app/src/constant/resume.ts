export const getYearsArray = (from = 2000, to = 2030) => {
  const years = [];
  // eslint-disable-next-line no-plusplus
  for (let year = from; year < to; year++) {
    years.push(year);
  }
  return years;
};
