import { getConnection } from 'typeorm';
import type { IPartRepository } from '../../domain/models/part/IPartRepository';
import type { IPartFactory } from '../../domain/models/part/IPartFactory';
import { PartORMEntity } from '../../orm';
import { Part } from '../../domain/models/part/Part';
import type { PartNum } from '../../domain/models/part/PartNum';
import { ChapterNum } from '../../domain/models/chapter/ChapterNum';

export class PartRepository implements IPartRepository {
  private readonly partFactory: IPartFactory;

  constructor(partFactory: IPartFactory) {
    this.partFactory = partFactory;
  }

  // eslint-disable-next-line class-methods-use-this
  save = async (part: Part) => {
    const partsTable = getConnection().getRepository(PartORMEntity);

    const partsData = new PartORMEntity();
    partsData.chapter_num = part.chapterNum.value;
    partsData.num = part.num.value;
    partsData.title = part.title.value;

    await partsTable.save(partsData); // upsert
  };

  findOne = async (chapterNum: ChapterNum, partNum: PartNum) => {
    const partsTable = getConnection().getRepository(PartORMEntity);
    const partData = await partsTable.findOne({
      where: {
        chapter_num: chapterNum.value,
        num: partNum.value,
      },
    });

    if (!partData) {
      return null;
    }

    const part = this.partFactory.create({
      chapterNumValue: partData.chapter_num,
      partNumValue: partData.num,
      partTitleValue: partData.title,
    });

    return part;
  };

  findAll = async () => {
    const partsTable = getConnection().getRepository(PartORMEntity);
    const partsData = await partsTable.find();
    const parts = partsData.map((partData) =>
      this.partFactory.create({
        chapterNumValue: partData.chapter_num,
        partNumValue: partData.num,
        partTitleValue: partData.title,
      })
    );
    return parts;
  };

  findByChapterNum = async (chapterNum: ChapterNum) => {
    const partsTable = getConnection().getRepository(PartORMEntity);
    const partsData = await partsTable.find({
      where: { chapter_num: chapterNum.value },
    });
    const parts = partsData.map((partData) =>
      this.partFactory.create({
        chapterNumValue: partData.chapter_num,
        partNumValue: partData.num,
        partTitleValue: partData.title,
      })
    );
    return parts;
  };

  // eslint-disable-next-line class-methods-use-this
  delete = async (part: Part) => {
    const partsTable = getConnection().getRepository(PartORMEntity);
    const result = await partsTable.delete({ chapter_num: part.chapterNum.value, num: part.num.value });
    if (!result) {
      throw new Error('削除しようとしたchapterは存在しません');
    }
  };
}
