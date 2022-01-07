import type { IChapterRepository } from '../../domain/models/chapter/IChapterRepository';
import { Chapter } from '../../domain/models/chapter/Chapter';
import { IChapterFactory } from '../../domain/models/chapter/IChapterFactory';
import { ChapterNum } from '../../domain/models/chapter/ChapterNum';

export class InMemoryChapterRepository implements IChapterRepository {
  private readonly chapterFactory: IChapterFactory;

  constructor(chapterFactory: IChapterFactory) {
    this.chapterFactory = chapterFactory;
  }

  public store = new Map<string, Chapter>();

  save = async (chapter: Chapter) => {
    const clonedChapter = this.clone(chapter);
    this.store.set(JSON.stringify(clonedChapter.num), clonedChapter);
  };

  findOne = async (chapterNum: ChapterNum) => {
    const chapter = this.store.get(JSON.stringify(chapterNum));

    if (!chapter) {
      return null;
    }
    return this.clone(chapter);
  };

  findAll = async () => {
    const result: Chapter[] = [];

    this.store.forEach((value) => {
      result.push(this.clone(value));
    });

    return result;
  };

  delete = async (chapter: Chapter) => {
    this.store.delete(JSON.stringify(chapter.num));
  };

  private readonly clone = (chapter: Chapter) => {
    const clonedChapter = this.chapterFactory.create(chapter.num.value, chapter.title.value);
    return clonedChapter;
  };
}
