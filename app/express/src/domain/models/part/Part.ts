import { ChapterNum } from '../chapter/ChapterNum';
import { PartNum } from './PartNum';
import { PartTitle } from './PartTitle';

export class Part {
  readonly chapterNum: ChapterNum;

  readonly num: PartNum;

  title: PartTitle;

  constructor(argsObj: { chapterNum: ChapterNum; partNum: PartNum; partTitle: PartTitle }) {
    this.chapterNum = argsObj.chapterNum;
    this.num = argsObj.partNum;
    this.title = argsObj.partTitle;
  }

  changeTitle = (partTitle: PartTitle) => {
    this.title = partTitle;
  };
}
