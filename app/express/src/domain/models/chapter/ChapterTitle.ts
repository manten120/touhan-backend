export class ChapterTitle {
  readonly value: string;

  constructor(value: string) {
    if (value === '') {
      throw new Error('PartTitleの値は1文字以上の文字列です');
    }

    this.value = value;
  }
}
