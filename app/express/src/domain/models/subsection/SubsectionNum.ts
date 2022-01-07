export class SubsectionNum {
  readonly value: number;

  constructor(value: number) {
    const isInteger = Number.isInteger(value); // valueがnumber型かつ整数ならtrue

    if (!isInteger) {
      throw new Error('SubsectionNumの値はnumber型の整数です');
    }

    const isWithinRange = value >= 0 && value <= 6;

    if (!isWithinRange) {
      throw new Error('SubsectionNumの値は最小値0、 最大値6です');
    }

    this.value = value;
  }
}
