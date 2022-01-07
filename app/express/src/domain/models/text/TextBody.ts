export class TextBody {
  readonly value: string;

  constructor(value: string) {
    if (value === '') {
      throw new Error('TextBodyの値は1文字以上の文字列です');
    }

    this.value = value;
  }
}
