export class Line {
  readonly value: number;

  constructor(value: number) {
    const isInteger = Number.isInteger(value); // valueがnumber型かつ整数ならtrue

    if (!isInteger) {
      throw new Error('Lineの値はnumber型の整数です');
    }

    const isWithinRange = value >= 1 && value <= 4779;

    if (!isWithinRange) {
      throw new Error('Lineの値は最小値1、 最大値4779です');
    }

    this.value = value;
  }
}
