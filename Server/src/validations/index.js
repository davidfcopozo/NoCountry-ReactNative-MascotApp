const isValidString = input => {
  return typeof input === "string" ? true : false;
};

const isValidNumber = input => {
  return !isNaN(parseInt(input));
};

module.exports = { isValidString, isValidNumber };
