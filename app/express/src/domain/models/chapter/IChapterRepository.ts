import type { Chapter } from './Chapter';
import type { ChapterNum } from './ChapterNum';

export interface IChapterRepository {
  save: (chapter: Chapter) => Promise<void>;
  find: (chapterNum: ChapterNum) => Promise<Chapter | null>;
  delete: (chapter: Chapter) => Promise<void>;
}
