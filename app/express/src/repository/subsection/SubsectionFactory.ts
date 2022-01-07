import type { ISubsectionFactory } from '../../domain/models/subsection/ISubSectionFactory';
import { ChapterNum } from '../../domain/models/chapter/ChapterNum';
import { PartNum } from '../../domain/models/part/PartNum';
import { SectionNum } from '../../domain/models/section/SectionNum';
import { SubsectionNum } from '../../domain/models/subsection/SubsectionNum';
import { SubsectionTitle } from '../../domain/models/subsection/SubsectionTitle';
import { Subsection } from '../../domain/models/subsection/Subsection';

export class SubsectionFactory implements ISubsectionFactory {
  // eslint-disable-next-line class-methods-use-this
  create = (argsObj: {
    chapterNumValue: number;
    partNumValue: number;
    sectionNumValue: number;
    subsectionNumValue: number;
    subsectionTitleValue: string | null;
  }) => {
    const chapterNum = new ChapterNum(argsObj.chapterNumValue);
    const partNum = new PartNum(argsObj.partNumValue);
    const sectionNum = new SectionNum(argsObj.sectionNumValue);
    const subsectionNum = new SubsectionNum(argsObj.subsectionNumValue);
    const subsectionTitle = new SubsectionTitle(argsObj.subsectionTitleValue);

    const subsection = new Subsection({
      chapterNum,
      partNum,
      sectionNum,
      subsectionNum,
      subsectionTitle,
    });

    return subsection;
  };
}
