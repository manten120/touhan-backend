import type { ChapterNum } from '../chapter/ChapterNum';
import type { PartNum } from '../part/PartNum';
import type { SectionNum } from '../section/SectionNum';
import type { SubsectionNum } from '../subsection/SubsectionNum';
import type { TopicChar } from './TopicChar';
import type { Topic } from './Topic';

export interface ITopicRepository {
  save: (topic: Topic) => Promise<void>;

  findOne: (argsObj: {
    chapterNum: ChapterNum;
    partNum: PartNum;
    sectionNum: SectionNum;
    subsectionNum: SubsectionNum;
    topicChar: TopicChar;
  }) => Promise<Topic | null>;

  findAll: () => Promise<Topic[]>;

  findBySubsection: (argsObj: {
    chapterNum: ChapterNum;
    partNum: PartNum;
    sectionNum: SectionNum;
    subsectionNum: SubsectionNum;
  }) => Promise<Topic[]>;

  delete: (topic: Topic) => Promise<void>;
}
