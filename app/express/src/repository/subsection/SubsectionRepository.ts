import { getConnection } from 'typeorm';
import { SubsectionORMEntity } from '../../orm';
import type { ISubsectionRepository } from '../../domain/models/subsection/ISubsectionRepository';
import type { ISubsectionFactory } from '../../domain/models/subsection/ISubSectionFactory';
import type { ChapterNum } from '../../domain/models/chapter/ChapterNum';
import type { PartNum } from '../../domain/models/part/PartNum';
import type { SectionNum } from '../../domain/models/section/SectionNum';
import type { Subsection } from '../../domain/models/subsection/Subsection';
import type { SubsectionNum } from '../../domain/models/subsection/SubsectionNum';

export class subsectionRepository implements ISubsectionRepository {
  private readonly subsectionFactory: ISubsectionFactory;

  constructor(subsectionFactory: ISubsectionFactory) {
    this.subsectionFactory = subsectionFactory;
  }

  // eslint-disable-next-line class-methods-use-this
  save = async (subsection: Subsection) => {
    const subsectionsTable = getConnection().getRepository(SubsectionORMEntity);

    const subsectionData = new SubsectionORMEntity();
    subsectionData.chapter_num = subsection.chapterNum.value;
    subsectionData.part_num = subsection.partNum.value;
    subsectionData.section_num = subsection.sectionNum.value;
    subsectionData.num = subsection.subsectionNum.value;
    subsectionData.title = subsection.subsectionTitle.value;

    await subsectionsTable.save(subsectionData);
  };

  find = async (argsObj: {
    chapterNum: ChapterNum;
    partNum: PartNum;
    sectionNum: SectionNum;
    subsectionNum: SubsectionNum;
  }) => {
    const subsectionsTable = getConnection().getRepository(SubsectionORMEntity);

    const subsectionData = await subsectionsTable.findOne({
      where: {
        chapter_num: argsObj.chapterNum.value,
        part_num: argsObj.partNum.value,
        section_num: argsObj.sectionNum.value,
        num: argsObj.sectionNum.value,
      },
    });

    if (!subsectionData) {
      return null;
    }

    const subsection = this.subsectionFactory.create({
      chapterNumValue: subsectionData.chapter_num,
      partNumValue: subsectionData.part_num,
      sectionNumValue: subsectionData.section_num,
      subsectionNumValue: subsectionData.num,
      subsectionTitleValue: subsectionData.title,
    });

    return subsection;
  };
}
