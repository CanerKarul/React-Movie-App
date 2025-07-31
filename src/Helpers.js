export const getAvarage = (array) =>
  array.reduce((sum, value) => sum + value / array.length, 0);