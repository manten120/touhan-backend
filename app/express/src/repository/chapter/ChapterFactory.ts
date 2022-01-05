import { Chapter } from '../../domain/models/chapter/Chapter';
import { ChapterNum } from '../../domain/models/chapter/ChapterNum';
import { ChapterTitle } from '../../domain/models/chapter/ChapterTitle';
import type { IChapterFactory } from '../../domain/models/chapter/IChapterFactory';

export class ChapterFactory implements IChapterFactory {
  // eslint-disable-next-line class-methods-use-this
  create = (chapterNumValue: number, chapterTitleValue: string) => {
    const chapterNum = new ChapterNum(chapterNumValue);
    const chapterTitle = new ChapterTitle(chapterTitleValue);
    const chapter = new Chapter(chapterNum, chapterTitle);
    return chapter;
  };
}
