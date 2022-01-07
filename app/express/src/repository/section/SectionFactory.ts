import { ChapterNum } from '../../domain/models/chapter/ChapterNum';
import { PartNum } from '../../domain/models/part/PartNum';
import { SectionNum } from '../../domain/models/section/SectionNum';
import { SectionTitle } from '../../domain/models/section/SectionTitle';
import { Section } from '../../domain/models/section/Section';
import { ISectionFactory } from '../../domain/models/section/ISectionFactory';

export class SectionFactory implements ISectionFactory {
  // eslint-disable-next-line class-methods-use-this
  create = (argsObj: {
    chapterNumValue: number;
    partNumValue: number;
    sectionNumValue: number;
    sectionTitleValue: string | null;
  }) => {
    const chapterNum = new ChapterNum(argsObj.chapterNumValue);
    const partNum = new PartNum(argsObj.partNumValue);
    const sectionNum = new SectionNum(argsObj.sectionNumValue);
    const sectionTitle = new SectionTitle(argsObj.sectionTitleValue);

    const section = new Section({ chapterNum, partNum, sectionNum, sectionTitle });

    return section;
  };
}
