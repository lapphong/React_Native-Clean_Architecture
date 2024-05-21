declare global {
  interface Number {
    plus(n: number): number;
    minus(n: number): number;
    times(n: number): number;
    div(n: number): number;
    truncateDiv(n: number): number;
  }
}

Number.prototype.plus = function (n: number): number {
  return this.valueOf() + n;
};

Number.prototype.minus = function (n: number): number {
  return this.valueOf() - n;
};

Number.prototype.times = function (n: number): number {
  return this.valueOf() * n;
};

Number.prototype.div = function (n: number): number {
  return this.valueOf() / n;
};

Number.prototype.truncateDiv = function (n: number): number {
  return this.valueOf() / ~n;
};

export {};
