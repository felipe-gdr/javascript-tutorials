const Sum = x => ({
  concat: ({x: y}) => Sum(x + y),
  empty: () => Sum(0),
  inspect: () => `Sum(${x})`,
  x,
});

module.exports = {
  Sum,
};
