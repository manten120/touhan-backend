export class SectionTitle {
  readonly value: string | null;

  constructor(value: string | null) {
    const length = value?.length;

    // valueが空文字列ではない文字列まはたnullのときtrue
    const isSNonEmptyStringOrNull = length === undefined || length >= 1;

    if (!isSNonEmptyStringOrNull) {
      throw new Error('SectionTitleの値はnullまたは空文字列ではない文字列です');
    }

    this.value = value;
  }
}
