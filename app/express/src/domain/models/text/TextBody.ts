export class TextBody {
  readonly value: string;

  constructor(argsObj: { value: string }) {
    if(argsObj.value === '') {
      throw new Error('TextBodyの値は1文字以上の文字列です');
    }

    this.value = argsObj.value;
  }
}