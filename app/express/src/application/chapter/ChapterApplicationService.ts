import type { IChapterRepository } from '../../domain/models/chapter/IChapterRepository';
import { ChapterNum } from '../../domain/models/chapter/ChapterNum';
import type { IChapterFactory } from '../../domain/models/chapter/IChapterFactory';
import { ChapterTitle } from '../../domain/models/chapter/ChapterTitle';
import { ChapterDTO } from './ChapterDTO';

export class ChapterApplicationService {
  private readonly chapterRepository: IChapterRepository;

  private readonly chapterFactory: IChapterFactory;

  constructor(chapterRepository: IChapterRepository, chapterFactory: IChapterFactory) {
    this.chapterRepository = chapterRepository;
    this.chapterFactory = chapterFactory;
  }

  register = async (chapterNumValue: number, chapterTitleValue: string) => {
    const chapterNum = new ChapterNum(chapterNumValue);

    const chapter = await this.chapterRepository.find(chapterNum);

    if (chapter) {
      throw new Error('chapterNumValueに対応するchapterが既に存在しています');
    }

    const newChapter = this.chapterFactory.create(chapterNumValue, chapterTitleValue);

    await this.chapterRepository.save(newChapter);
  };

  find = async (chapterNumValue: number) => {
    const chapterNum = new ChapterNum(chapterNumValue);

    const chapter = await this.chapterRepository.find(chapterNum);

    if (!chapter) {
      throw new Error('chapterNumValueに対応するchapterが存在しません');
    }

    const chapterDTO = new ChapterDTO(chapter);

    return chapterDTO;
  };

  findAll = async () => {
    const chapters = await this.chapterRepository.findAll();

    const arrayOfChapterDTO = chapters.map((chapter) => new ChapterDTO(chapter));

    return arrayOfChapterDTO;
  };

  update = async (chapterNumValue: number, chapterTitleValue: string) => {
    const chapterNum = new ChapterNum(chapterNumValue);
    const chapter = await this.chapterRepository.find(chapterNum);

    if (!chapter) {
      throw new Error('chapterNumValueに対応するchapterが存在しません');
    }

    const newChapterTitle = new ChapterTitle(chapterTitleValue);

    chapter.changeTitle(newChapterTitle);

    await this.chapterRepository.save(chapter);
  };

  // upsert = async (chapterNumValue: number, chapterTitleValue: string) => {
  //   try {
  //     this.update(chapterNumValue, chapterTitleValue);
  //   } catch {
  //     this.create(chapterNumValue, chapterTitleValue);
  //   }
  // };

  delete = async (chapterNumValue: number) => {
    const chapterNum = new ChapterNum(chapterNumValue);
    const chapter = await this.chapterRepository.find(chapterNum);

    if (!chapter) {
      throw new Error('chapterNumValueに対応するchapterは存在しません');
    }

    await this.chapterRepository.delete(chapter);
  };
}
