import { ChapterNum } from '../chapter/ChapterNum';
import { PartNum } from '../part/PartNum';
import { SectionNum } from '../section/SectionNum';
import { SubsectionNum } from './SubsectionNum';
import { SubsectionTitle } from './SubsectionTitle';

export class Subsection {
  readonly chapterNum: ChapterNum;

  readonly partNum: PartNum;

  readonly sectionNum: SectionNum;

  readonly num: SubsectionNum;

  title: SubsectionTitle;

  constructor(argsObj: {
    chapterNum: ChapterNum;
    partNum: PartNum;
    sectionNum: SectionNum;
    subsectionNum: SubsectionNum;
    subsectionTitle: SubsectionTitle;
  }) {
    if (argsObj.subsectionNum.value === 0 && argsObj.subsectionTitle !== null) {
      throw new Error('SubSectionNumの値が0のとき、SubsectionTitleの値はnullです');
    }

    this.chapterNum = argsObj.chapterNum;
    this.partNum = argsObj.partNum;
    this.sectionNum = argsObj.sectionNum;
    this.num = argsObj.subsectionNum;
    this.title = argsObj.subsectionTitle;
  }

  readonly changeTitle = (subsectionTitle: SubsectionTitle) => {
    if (this.num.value === 0 && subsectionTitle.value !== null) {
      throw new Error('subsectionNumの値が0のとき、subsectionTitleの値はnullです');
    }
    this.title = subsectionTitle;
  };
}
