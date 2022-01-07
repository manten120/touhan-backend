import type { Section } from './Section';
import type { ChapterNum } from '../chapter/ChapterNum';
import type { PartNum } from '../part/PartNum';
import type { SectionNum } from './SectionNum';

export interface ISectionRepository {
  save: (section: Section) => Promise<void>;
  findOne: (argsObj: { chapterNum: ChapterNum; partNum: PartNum; sectionNum: SectionNum }) => Promise<Section | null>;
  findAll: () => Promise<Section[]>;
  findByPart: (chapterNum: ChapterNum, partNum: PartNum) => Promise<Section[]>;
  delete: (section: Section) => Promise<void>;
}
