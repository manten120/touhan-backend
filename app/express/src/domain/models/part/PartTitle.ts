export class PartTitle {
  readonly value: string;

  constructor(argsObj: { value: string }) {
    if (argsObj.value === '') {
      throw new Error('PartTitleの値は空文字列ではない文字列です');
    }

    this.value = argsObj.value;
  }
}
