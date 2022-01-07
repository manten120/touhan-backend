export class PartTitle {
  readonly value: string;

  constructor(value: string) {
    if (value === '') {
      throw new Error('PartTitleの値は空文字列ではない文字列です');
    }

    this.value = value;
  }
}
