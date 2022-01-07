import type { Subsection } from './Subsection';
import type { ChapterNum } from '../chapter/ChapterNum';
import type { PartNum } from '../part/PartNum';
import type { SectionNum } from '../section/SectionNum';
import type { SubsectionNum } from './SubsectionNum';

export interface ISubsectionRepository {
  save: (subsection: Subsection) => Promise<void>;
  find: (argsObj: {
    chapterNum: ChapterNum;
    partNum: PartNum;
    sectionNum: SectionNum;
    subsectionNum: SubsectionNum;
  }) => Promise<Subsection | null>;
}
