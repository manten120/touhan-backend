export class PartNum {
  readonly value: number;

  constructor(value: number) {
    const isInteger = Number.isInteger(value); // valueがnumber型かつ整数ならtrue

    if (!isInteger) {
      throw new Error('PartNumの値はnumber型の整数です');
    }

    const isWithinRange = value >= 1 && value <= 16;

    if (!isWithinRange) {
      throw new Error('PartNumの値は最小値1、 最大値16です');
    }

    this.value = value;
  }
}
