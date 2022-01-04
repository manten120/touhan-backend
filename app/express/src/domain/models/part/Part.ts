import { ChapterNum } from "../chapter/ChapterNum";
import { PartNum } from "./PartNum";
import { PartTitle } from "./PartTitle";

export class Part {
  readonly chapterNum: ChapterNum;

  readonly partNum: PartNum;

  readonly partTitle: PartTitle;

  constructor(argsObj: { chapterNum: ChapterNum, partNum: PartNum, partTitle: PartTitle, }) {
    this.chapterNum = argsObj.chapterNum;
    this.partNum = argsObj.partNum;
    this.partTitle = argsObj.partTitle;
  }
}