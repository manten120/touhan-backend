export class TopicChar {
  readonly value: string;

  constructor(argsObj: { value: string }) {
    const { value } = argsObj;

    // アルファベット小文字1文字ならtrue
    const isOneLowercaseLetter = (/^[a-z]$/).test(value)

    if (!isOneLowercaseLetter) {
      throw new Error('TopicCharの値はアルファベットの小文字1文字です');
    }

    this.value = value;
  }
}
