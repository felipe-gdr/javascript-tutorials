const { List } = require("immutable-ext");

const Sum = x => ({
  x,
  concat: ({x: y}) => Sum(x + y),
  empty: () => Sum(0),
  inspect: () => `Sum(${x})`,
});

const fromNullable = x => x != null ? Right(x) : Left(x);

const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  concat: o => o.fold(e => Left(e), r => Right(x.concat(r))),
  inspect: () => `Right(${x.inspect()})`
});

const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x),
  concat: o => Left(x),
  inspect: () => `Left(${x})`
})

const stats = List.of({
  page: "Index",
  views: 40
}, {
  page: "Home",
  views:10
}, {
  page: "Menu",
  views: 4
});

const result = stats.foldMap(x => fromNullable(x.views).map(Sum), Right(Sum(0)));

console.log(result);