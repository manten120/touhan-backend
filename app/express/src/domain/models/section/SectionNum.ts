export class SectionNum {
  readonly value: number;

  constructor(value: number) {
    const isInteger = Number.isInteger(value); // valueがnumber型かつ整数ならtrue

    if (!isInteger) {
      throw new Error('SectionNumの値はnumber型の整数です');
    }

    const isWithinRange = value >= 0 && value <= 6;

    if (!isWithinRange) {
      throw new Error('SectionNumの値は最小値0、 最大値6です');
    }

    this.value = value;
  }
}
