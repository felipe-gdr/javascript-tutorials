const fromNullable = x => x != null ? Right(x) : Left(null);

const Right = x => ({
  chain: f => f(x),
  concat: o => o.fold(e => Left(e), r => Right(x.concat(r))),
  fold: (f, g) => g(x),
  inspect: () => `Right(${typeof x.inspect === "function" ? x.inspect() : x})`,
  map: f => Right(f(x)),
});

const Left = x => ({
  chain: f => Left(x),
  concat: o => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
  map: f => Left(x),
});

const Either = {
  of: x => Right(x),
};

module.exports = {
  Either,
  Left,
  Right,
  fromNullable,
};
