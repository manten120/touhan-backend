export class ChapterNum {
  readonly value: number;

  constructor(value: number) {
    const isInteger = Number.isInteger(value);

    if (!isInteger) {
      throw new Error('ChapterNumの値は整数です');
    }

    const isWithinRange = value >= 1 && value <= 5;

    if(!isWithinRange) {
      throw new Error('ChapterNumの値は最小値1、最大値5です')
    }

    this.value = value;
  }
}
