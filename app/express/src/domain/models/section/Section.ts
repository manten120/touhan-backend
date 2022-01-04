import { ChapterNum } from '../chapter/ChapterNum';
import { PartNum } from '../part/PartNum';
import { SectionNum } from './SectionNum';
import { SectionTitle } from './SectionTitle';

export class Section {
  readonly chapterNum: ChapterNum;

  readonly partNum: PartNum;

  readonly sectionNum: SectionNum;

  readonly sectionTitle: SectionTitle;

  constructor(argsObj: {
    chapterNum: ChapterNum;
    partNum: PartNum;
    sectionNum: SectionNum;
    sectionTitle: SectionTitle;
  }) {
    if (argsObj.sectionNum.value === 0 && argsObj.sectionTitle !== null) {
      throw new Error('SectionNumの値が0のとき、SectionTitleの値はnullです');
    }

    this.chapterNum = argsObj.chapterNum;
    this.partNum = argsObj.partNum;
    this.sectionNum = argsObj.sectionNum;
    this.sectionTitle = argsObj.sectionTitle;
  }
}
