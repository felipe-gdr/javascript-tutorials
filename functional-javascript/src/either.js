const fromNullable = x => x != null ? Right(x) : Left(null);

const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  concat: o => o.fold(e => Left(e), r => Right(x.concat(r))),
  chain: f => f(x),
  inspect: () => `Right(${typeof x.inspect === "function" ? x.inspect() : x})`
});

Right.of = x => Right(x);

const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x),
  concat: o => Left(x),
  chain: f => Left(x),
  inspect: () => `Left(${x})`
});

Left.of = x => Left(x);

module.exports = {
  Right,
  Left,
  fromNullable
};