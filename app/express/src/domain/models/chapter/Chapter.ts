import { ChapterNum } from './ChapterNum';
import { ChapterTitle } from './ChapterTitle';
import { PAIRS_OF_CHAPTER_NUM_VALUE_AND_CHAPTER_TITLE_VALUE } from './constants';

export class Chapter {
  public readonly num: ChapterNum;

  public readonly title: ChapterTitle;

  constructor(argsObj: { chapterNum: ChapterNum; chapterTitle: ChapterTitle }) {
    const pair = { chapterNumValue: argsObj.chapterNum.value, chapterTitleValue: argsObj.chapterTitle.value };

    if (!PAIRS_OF_CHAPTER_NUM_VALUE_AND_CHAPTER_TITLE_VALUE.includes(pair)) {
      throw new Error('chapterNumとchapterTitleの組み合わせが不正です');
    }

    this.num = argsObj.chapterNum;
    this.title = argsObj.chapterTitle;
  }
}
