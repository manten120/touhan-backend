import { getConnection } from 'typeorm';
import type { ISectionRepository } from '../../domain/models/section/ISectionRepository';
import { SectionORMEntity } from '../../orm';
import { Section } from '../../domain/models/section/Section';
import type { ISectionFactory } from '../../domain/models/section/ISectionFactory';
import type { ChapterNum } from '../../domain/models/chapter/ChapterNum';
import type { PartNum } from '../../domain/models/part/PartNum';
import type { SectionNum } from '../../domain/models/section/SectionNum';

export class SectionRepository implements ISectionRepository {
  private readonly sectionFactory: ISectionFactory;

  constructor(sectionFactory: ISectionFactory) {
    this.sectionFactory = sectionFactory;
  }

  // eslint-disable-next-line class-methods-use-this
  save = async (section: Section) => {
    const sectionsTable = getConnection().getRepository(SectionORMEntity);

    const sectionData = new SectionORMEntity();
    sectionData.chapter_num = section.chapterNum.value;
    sectionData.part_num = section.partNum.value;
    sectionData.num = section.num.value;
    sectionData.title = section.title.value;

    await sectionsTable.save(sectionData);
  };

  findOne = async (argsObj: { chapterNum: ChapterNum; partNum: PartNum; sectionNum: SectionNum }) => {
    const sectionsTable = getConnection().getRepository(SectionORMEntity);

    const sectionData = await sectionsTable.findOne({
      where: {
        chapter_num: argsObj.chapterNum.value,
        part_num: argsObj.partNum.value,
        num: argsObj.sectionNum.value,
      },
    });

    if (!sectionData) {
      return null;
    }

    const section = this.sectionFactory.create({
      chapterNumValue: sectionData.chapter_num,
      partNumValue: sectionData.part_num,
      sectionNumValue: sectionData.num,
      sectionTitleValue: sectionData.title,
    });

    return section;
  };

  findAll = async () => {
    const sectionsTable = getConnection().getRepository(SectionORMEntity);

    const sectionsData = await sectionsTable.find();

    const sections = sectionsData.map((sectionData) =>
      this.sectionFactory.create({
        chapterNumValue: sectionData.chapter_num,
        partNumValue: sectionData.part_num,
        sectionNumValue: sectionData.num,
        sectionTitleValue: sectionData.title,
      })
    );

    return sections;
  };

  findByPart = async (chapterNum: ChapterNum, partNum: PartNum) => {
    const sectionsTable = getConnection().getRepository(SectionORMEntity);

    const sectionsData = await sectionsTable.find({
      where: {
        chapter_num: chapterNum.value,
        part_num: partNum.value,
      },
    });

    const sections = sectionsData.map((sectionData) =>
      this.sectionFactory.create({
        chapterNumValue: sectionData.chapter_num,
        partNumValue: sectionData.part_num,
        sectionNumValue: sectionData.num,
        sectionTitleValue: sectionData.title,
      })
    );

    return sections;
  };

  // eslint-disable-next-line class-methods-use-this
  delete = async (section: Section) => {
    const sectionsTable = getConnection().getRepository(SectionORMEntity);

    const result = await sectionsTable.delete({
      chapter_num: section.chapterNum.value,
      part_num: section.partNum.value,
      num: section.num.value,
    });
    if (!result) {
      throw new Error('削除しようとしたsectionは存在しません');
    }
  };
}
