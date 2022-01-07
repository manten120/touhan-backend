import type { ChapterNum } from '../chapter/ChapterNum';
import type { PartNum } from '../part/PartNum';
import type { SectionNum } from '../section/SectionNum';
import type { SubsectionNum } from '../subsection/SubsectionNum';
import type { TopicChar } from './TopicChar';
import type { Topic } from './Topic';

export interface ITopicRepository {
  save: (topic: Topic) => Promise<void>;
  find: (argsObj: {
    chapterNum: ChapterNum;
    partNum: PartNum;
    sectionNum: SectionNum;
    subsectionNum: SubsectionNum;
    topicChar: TopicChar;
  }) => Promise<Topic | null>;
}
