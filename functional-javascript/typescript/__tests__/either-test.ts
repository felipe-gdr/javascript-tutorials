import "../extensions/jest.ext";
import { Either, Left, Right } from "../src/either";

const id = <T>(x: T): T => x;

describe("fromNullable", () => {
  test("returns Left when value if null", () => {
    expect(Either.fromNullable(null)).toBeLeft(null);
  });

  test("returns Right when value is not null", () => {
    expect(Either.fromNullable(101)).toBeRight(101);
  });
});

describe("Right", () => {
  const aRight: Either<string, Number> = Either.of(1);

  const join = (m: any) => m.chain(id);
  const addOne = (x: any) => x + 1;

  describe("Functor and Monadic laws", () => {
    test("Functor function composition law holds", () => {
      const divideByTwo = (x: any) => x / 2;

      expect(aRight.map(addOne).map(divideByTwo)).toMatchEither(
        aRight.map((x) => divideByTwo(addOne(x))),
      );
    });

    test("Functor ID function law holds", () => {
      expect(aRight.map(id)).toMatchEither(id(aRight));
    });

    test("Monad join associative law holds", () => {
      const nestedMonad = Either.of(Either.of(aRight));

      expect(join(nestedMonad.map(join))).toMatchEither(
        join(join(nestedMonad)),
      );
    });

    test("Monad box and join combination law holds", () => {
      expect(join(Either.of(aRight))).toMatchEither(join(aRight.map(Right.of)));
    });
  });
  describe("#chain()", () => {
    it("results in Left when Left is returned", () => {
      const aLeft = aRight.chain((x) => new Left("Error!"));

      expect(aLeft).toBeLeft("Error!");
    });
  });

  describe("#fold()", () => {
    it("applies left callback when it's Left", () => {
      const aLeft = aRight
        .chain((x) => new Left("Error!"))
        .fold((errorMessage) => errorMessage.toUpperCase(), addOne);

      expect(aLeft).toBe("ERROR!");
    });

    it("applies right callback when it's Right", () => {
      const anotherRight = aRight
        .fold((errorMessage) => errorMessage.toUpperCase(), addOne);

      expect(anotherRight).toBe(2);
    });
  });
});
