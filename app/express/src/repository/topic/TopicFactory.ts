import type { ITopicFactory } from '../../domain/models/topic/ITopicFactory';
import { ChapterNum } from '../../domain/models/chapter/ChapterNum';
import { PartNum } from '../../domain/models/part/PartNum';
import { SectionNum } from '../../domain/models/section/SectionNum';
import { SubsectionNum } from '../../domain/models/subsection/SubsectionNum';
import { TopicChar } from '../../domain/models/topic/TopicChar';
import { TopicTitle } from '../../domain/models/topic/TopicTitle';
import { Topic } from '../../domain/models/topic/Topic';

export class TopicFactory implements ITopicFactory {
  // eslint-disable-next-line class-methods-use-this
  create = (argsObj: {
    chapterNumValue: number;
    partNumValue: number;
    sectionNumValue: number;
    subsectionNumValue: number;
    topicCharValue: string;
    topicTitleValue: string | null;
  }) => {
    const chapterNum = new ChapterNum(argsObj.chapterNumValue);
    const partNum = new PartNum(argsObj.partNumValue);
    const sectionNum = new SectionNum(argsObj.sectionNumValue);
    const subsectionNum = new SubsectionNum(argsObj.subsectionNumValue);
    const topicChar = new TopicChar(argsObj.topicCharValue);
    const topicTitle = new TopicTitle(argsObj.topicTitleValue);

    const topic = new Topic({
      chapterNum,
      partNum,
      sectionNum,
      subsectionNum,
      topicChar,
      topicTitle,
    });

    return topic;
  };
}
