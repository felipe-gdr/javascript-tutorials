import { Either } from "../src/either-ts";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeLeft(argument: any): R;
      toBeRight(argument: any): R;
      toMatchEither<L, N>(argument: Either<L, N>): R;
    }
  }
}

const id = (x: any) => x;

function toBeLeft<L, R>(this: jest.MatcherUtils, received: Either<L, R>, argument: any) {
  const pass = received.fold(id, id) === argument;

  if (pass) {
    return {
      message: () =>
        `expected ${received} to not be a Left with the value ${argument}`,
      pass: true,
    };
  } else {
    return {
      message: () =>
        `expected ${received.inspect()} to be a Left with the value ${argument}`,
      pass: false,
    };
  }
}

function toBeRight<L, R>(
  this: jest.MatcherUtils,
  received: Either<L, R>,
  argument: any,
) {
  const pass = received.fold(id, id) === argument;

  if (pass) {
    return {
      message: () =>
        `expected ${received} to not be a Right with the value ${argument}`,
      pass: true,
    };
  } else {
    return {
      message: () =>
        `expected ${received.inspect()} to be a Right with the value ${argument}`,
      pass: false,
    };
  }
}

function toMatchEither<L, R>(
  this: jest.MatcherUtils,
  received: Either<L, R>,
  argument: any,
) {
  const pass = received.fold(id, id) === argument.fold(id, id);

  if (pass) {
    return {
      message: () =>
        `expected ${received} to not be an Either matching ${argument}`,
      pass: true,
    };
  } else {
    return {
      message: () =>
        `expected ${received} to be an Either matching ${argument}`,
      pass: false,
    };
  }
}

expect.extend({
  toBeLeft,
  toBeRight,
  toMatchEither,
});
