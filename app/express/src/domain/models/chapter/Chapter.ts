import { ChapterNum } from './ChapterNum';
import { ChapterTitle } from './ChapterTitle';

export class Chapter {
  readonly num: ChapterNum;

  title: ChapterTitle;

  constructor(chapterNum: ChapterNum, chapterTitle: ChapterTitle) {
    this.num = chapterNum;
    this.title = chapterTitle;
  }

  changeTitle = (chapterTitle: ChapterTitle) => {
    this.title = chapterTitle;
  };
}
