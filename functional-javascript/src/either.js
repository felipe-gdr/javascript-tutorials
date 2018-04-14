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

module.exports = {
  Right, 
  Left, 
  fromNullable
}