/**
 * string型の半角または全角の数字を、number型に変換する。
 * 数字以外の文字列を引数strに渡すとエラーをスローする。
 * @param str 半角または全角の数字
 * @returns 数値
 */
export const convertStringToNumber = (str: string) => {
  // strに含まれる全角数字を半角数字にする
  const replacedStr = str.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));

  // 数値にする。replacedStrが数字以外の文字を含む場合NaNになる。
  // Number()の注意点: 空文字列、スペース、falseは0、trueは1になる
  const num1 = Number(replacedStr);

  // 数値にする。replacedStrが数字以外の文字を含む場合NaNになる。
  // parseInt()の注意点: 真偽値、空文字列、スペースはNaNになる。文字列に数字以外の文字を含む場合、数字以外の文字の直前までの数字を数値に変換する。数字以外の文字で始まる場合はNaN
  const num2 = parseInt(replacedStr, 10);

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    throw new Error('引数strに数字でない文字を含むため半角数値への変換に失敗しました');
  }

  return num1;
};
