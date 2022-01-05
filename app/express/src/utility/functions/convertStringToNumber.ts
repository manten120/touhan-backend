/**
 * string型の半角または全角の数字を、number型に変換する。
 * 数字以外の文字列を引数strに渡すとエラーをスローする。
 * @param str 半角または全角の数字
 * @returns 数値
 */
export const convertStringToNumber = (str: string) => {
  // strに含まれる全角数字を半角数字にする
  const replacedStr = str.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));

  // 数値にする。replacedStrが数字以外の文字を含む場合NaNになる
  const num = Number(replacedStr);

  if (Number.isNaN(num)) {
    throw new Error('引数strに数字でない文字を含むため半角数値への変換に失敗しました');
  }

  return num;
};
