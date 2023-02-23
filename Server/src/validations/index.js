const isValidString = input => {
  return typeof input === 'string';
};

const isValidNumber = input => {
  return isNaN(parseInt(input));
};

module.exports = { isValidString, isValidNumber };
