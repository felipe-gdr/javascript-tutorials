export interface RightValue {
  [prop: string]: any;
  inspect?(): string;
  concat?<R extends RightValue>(x: R): R;
}

abstract class Either<L, R extends RightValue> {
  public static of<L, R>(r: R): Right<L, R> {
    return new Right(r);
  }

  public static fromNullable<R>(r: R): Either<null, R> {
    return r != null ? new Right(r) : new Left(null);
  }

  public abstract map<NR>(f: (r: R) => NR): Either<L, NR>;

  public abstract fold<NL, NR>(f: (l: L) => NL, g: (r: R) => NR): NL | NR;

  public abstract concat(o: Either<L, R>): Either<L, R>;

  public abstract chain<NR>(f: (r: R) => Either<L, NR>): Either<L, NR>;

  public abstract inspect(): string;
}

class Right<L, R extends RightValue> extends Either<L, R> {
  public constructor(protected r: R) {
    super();
  }

  public map<NR>(f: (r: R) => NR): Right<L, NR> {
    return new Right(f(this.r));
  }

  public fold<NL, NR extends RightValue>(
    f: (l: L) => NL,
    g: (r: R) => NR,
  ): NL | NR {
    return g(this.r);
  }

  public concat(o: Either<L, R>): Either<L, R> {
    const concatFromRightValue = this.r.concat;

    if (typeof concatFromRightValue !== "function") {
      throw new Error(
        `${
          this.r
        } does not have a "concat" function, so concat() cannot be called from this Either`,
      );
    } else {
      return o.fold(
        (e) => new Left<L, R>(e),
        (r) => new Right<L, R>(concatFromRightValue(r)),
      );
    }
  }

  public chain<NR>(f: (r: R) => Either<L, NR>): Either<L, NR> {
    return f(this.r);
  }

  public inspect(): string {
    return `Right(${
      typeof this.r.inspect === "function" ? this.r.inspect() : this.r
    })`;
  }
}

class Left<L, R extends RightValue> extends Either<L, R> {
  public constructor(protected l: L) {
    super();
  }

  public map<NR>(f: (r: R) => NR): Either<L, NR> {
    return new Left(this.l);
  }
  public fold<NL, NR>(f: (l: L) => NL, g: (r: R) => NR) {
    return f(this.l);
  }
  public concat(o: Either<L, R>): Either<L, R> {
    return new Left(this.l);
  }
  public chain<NR>(f: (x: R) => Either<L, NR>): Either<L, NR> {
    return new Left(this.l);
  }
  public inspect() {
    return `Left(${this.l})`;
  }
}

export { Either, Left, Right };
