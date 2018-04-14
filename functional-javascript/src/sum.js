const Sum = x => ({
  x,
  concat: ({x: y}) => Sum(x + y),
  empty: () => Sum(0),
  inspect: () => `Sum(${x})`,
});


module.exports = {
  Sum, 
}