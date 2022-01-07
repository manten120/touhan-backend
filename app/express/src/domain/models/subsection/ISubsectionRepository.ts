import type { Subsection } from './Subsection';
import type { ChapterNum } from '../chapter/ChapterNum';
import type { PartNum } from '../part/PartNum';
import type { SectionNum } from '../section/SectionNum';
import type { SubsectionNum } from './SubsectionNum';

export interface ISubsectionRepository {
  save: (subsection: Subsection) => Promise<void>;
  findOne: (argsObj: {
    chapterNum: ChapterNum;
    partNum: PartNum;
    sectionNum: SectionNum;
    subsectionNum: SubsectionNum;
  }) => Promise<Subsection | null>;
  findAll: () => Promise<Subsection[]>;
  findBySection: (argsObj: {
    chapterNum: ChapterNum;
    partNum: PartNum;
    sectionNum: SectionNum;
  }) => Promise<Subsection[]>;
  delete: (subsection: Subsection) => Promise<void>;
}
