import { getConnection } from 'typeorm';
import type { IChapterRepository } from '../../domain/models/chapter/IChapterRepository';
import type { IChapterFactory } from '../../domain/models/chapter/IChapterFactory';
import { ChapterORMEntity } from '../../orm';
import { ChapterNum } from '../../domain/models/chapter/ChapterNum';
import type { Chapter } from '../../domain/models/chapter/Chapter';

export class ChapterRepository implements IChapterRepository {
  private readonly chapterFactory: IChapterFactory;

  constructor(chapterFactory: IChapterFactory) {
    this.chapterFactory = chapterFactory;
  }

  // eslint-disable-next-line class-methods-use-this
  save = async (chapter: Chapter) => {
    const chaptersTable = getConnection().getRepository(ChapterORMEntity);

    const chapterData = new ChapterORMEntity();
    chapterData.num = chapter.num.value;
    chapterData.title = chapter.title.value;

    await chaptersTable.save(chapterData); // upsert
  };

  find = async (chapterNum: ChapterNum) => {
    const chaptersTable = getConnection().getRepository(ChapterORMEntity);
    const chapterData = await chaptersTable.findOne({ where: { num: chapterNum.value } });

    if (!chapterData) {
      return null;
    }

    const chapter = this.chapterFactory.create(chapterData.num, chapterData.title);

    return chapter;
  };

  // eslint-disable-next-line class-methods-use-this
  delete = async (chapter: Chapter) => {
    const chaptersTable = getConnection().getRepository(ChapterORMEntity);
    const result = await chaptersTable.delete({ num: chapter.num.value });
    if (!result) {
      throw new Error('削除しようとしたchapterは存在しません');
    }
  };
}
