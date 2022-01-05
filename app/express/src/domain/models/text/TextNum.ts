export class TextNum {
  readonly value: number;

  constructor(argsObj: { value: number }) {
    const { value } = argsObj;

    const isInteger = Number.isInteger(value); // valueがnumber型かつ整数ならtrue

    if (!isInteger) {
      throw new Error('TextNumの値はnumber型の整数です');
    }

    const isWithinRange = value >= 1 && value <= 3;

    if (!isWithinRange) {
      throw new Error('TextNumの値は最小値1、 最大値3です');
    }

    this.value = value;
  }
}
