import { PAIRS_OF_CHAPTER_NUM_VALUE_AND_CHAPTER_TITLE_VALUE } from './constants';
import type { ChapterNumValue } from '../../../types';

const expectedChapterNumValues = PAIRS_OF_CHAPTER_NUM_VALUE_AND_CHAPTER_TITLE_VALUE.map((pair) => pair.chapterNumValue);

export class ChapterNum {
  readonly value: ChapterNumValue;

  constructor(argsObj: { value: ChapterNumValue }) {
    if (!expectedChapterNumValues.includes(argsObj.value)) {
      const sortedExpectedChapterNumValues = expectedChapterNumValues.sort(); // 昇順(小さい順)にソート
      const minOfExpectedChapterNumValues = sortedExpectedChapterNumValues[0];
      const maxOfExpectedChapterNumValues = sortedExpectedChapterNumValues[sortedExpectedChapterNumValues.length - 1];

      const errorMessage = `ChapterNumの値は${minOfExpectedChapterNumValues}~${maxOfExpectedChapterNumValues}で、number型です`;
      throw new Error(errorMessage);
    }

    this.value = argsObj.value;
  }
}
