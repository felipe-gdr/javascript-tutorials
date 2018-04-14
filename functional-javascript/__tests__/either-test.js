const { fromNullable, Right, Left } = require("../src/either");

const id = x => x;

expect.extend({
  toBeRight(received, argument) {
    const pass = received.fold(null, id) === argument;

    if (pass) {
      return {
        message: () =>
          `expected ${received} to not be a Right with the value ${argument}`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected ${received.inspect()} to be a Right with the value ${argument}`,
        pass: false
      };
    }
  },
  toBeLeft(received, argument) {
    const pass = received.fold(id) === argument;

    if (pass) {
      return {
        message: () =>
          `expected ${received} to not be a Left with the value ${argument}`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected ${received.inspect()} to be a Left with the value ${argument}`,
        pass: false
      };
    }
  },
  toMatchEither(received, argument) {
    const pass = received.fold(id, id) === argument.fold(id, id);

    if (pass) {
      return {
        message: () =>
          `expected ${received} to not be an Either matching ${argument}`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be an Either matching ${argument}`,
        pass: false
      };
    }
  }
});

describe("fromNullable", () => {
  test("returns Left when value if null", () => {
    expect(fromNullable(null)).toBeLeft(null);
  });

  test("returns Right when value is not null", () => {
    expect(fromNullable(101)).toBeRight(101);
  });
});

describe("Right", () => {
  const aRight = Right.of(1);

  const join = m => m.chain(id);
  const addOne = x => x + 1;
  const divideByTwo = x => x / 2;
  const divideByNumber = n => x =>
    n === 0 ? Left("Error: division by zero") : Right(x / n);

  test("Functor function composition law holds", () => {
    expect(aRight.map(addOne).map(divideByTwo)).toMatchEither(
      aRight.map(x => divideByTwo(addOne(x)))
    );
  });

  test("Functor ID function law holds", () => {
    expect(aRight.map(id)).toMatchEither(id(aRight));
  });

  test("Monad join associative law holds", () => {
    const nestedMonad = Right.of(Right.of(aRight));

    expect(join(nestedMonad.map(join))).toMatchEither(
      join(join(nestedMonad))
    );
  });

  test("Monad box and join combination law holds", () => {
    expect(join(Right.of(aRight))).toMatchEither(
      join(aRight.map(Right))
    );
  });
});
