import { PAIRS_OF_CHAPTER_NUM_VALUE_AND_CHAPTER_TITLE_VALUE } from './constants';
import type { ChapterTitleValue } from '../../../types';

const expectedChapterTitleValues = PAIRS_OF_CHAPTER_NUM_VALUE_AND_CHAPTER_TITLE_VALUE.map(
  (pair) => pair.chapterTitleValue
);

export class ChapterTitle {
  readonly value: ChapterTitleValue;

  constructor(argsObj: { value: ChapterTitleValue }) {
    if (!expectedChapterTitleValues.includes(argsObj.value)) {
      const errorMessage = `ChapterValueの値は${expectedChapterTitleValues.join(', ')}のいずれかです`;
      throw new Error(errorMessage);
    }

    this.value = argsObj.value;
  }
}
