import type { ChapterNum } from '../chapter/ChapterNum';
import type { Part } from './Part';
import type { PartNum } from './PartNum';

export interface IPartRepository {
  save: (part: Part) => Promise<void>;
  find: (chapterNum: ChapterNum, partNum: PartNum) => Promise<Part | null>;
  findAll: () => Promise<Part[]>;
  delete: (part: Part) => Promise<void>;
}
