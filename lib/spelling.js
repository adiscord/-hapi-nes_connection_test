const spelling = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;

module.exports = {
  spelling,
};
