import type { Section } from './Section';
import type { ChapterNum } from '../chapter/ChapterNum';
import type { PartNum } from '../part/PartNum';
import type { SectionNum } from './SectionNum';

export interface ISectionRepository {
  save: (section: Section) => Promise<void>;
  find: (argsObj: { chapterNum: ChapterNum; partNum: PartNum; sectionNum: SectionNum }) => Promise<Section | null>;
}
