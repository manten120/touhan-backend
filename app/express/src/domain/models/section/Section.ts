import { ChapterNum } from '../chapter/ChapterNum';
import { PartNum } from '../part/PartNum';
import { SectionNum } from './SectionNum';
import { SectionTitle } from './SectionTitle';

export class Section {
  readonly chapterNum: ChapterNum;

  readonly partNum: PartNum;

  readonly num: SectionNum;

  title: SectionTitle;

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
    this.num = argsObj.sectionNum;
    this.title = argsObj.sectionTitle;
  }

  readonly changeTitle = (sectionTitle: SectionTitle) => {
    if (this.num.value === 0 && sectionTitle.value !== null) {
      throw new Error('SectionNumの値が0のとき、SectionTitleの値はnullです');
    }
    this.title = sectionTitle;
  };
}
