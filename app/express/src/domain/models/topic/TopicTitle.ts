export class TopicTitle {
  readonly value: string | null;

  constructor(argsObj: { value: string | null }) {
    const { value } = argsObj;
    const length = value?.length;
    
    // valueが空文字列ではない文字列まはたnullのときtrue
    const isSNonEmptyStringOrNull = length === undefined || length >= 1

    if (!isSNonEmptyStringOrNull) {
      throw new Error('TopicTitleの値はnullまたは空文字列ではない文字列です');
    }

    this.value = argsObj.value;
  }
}
