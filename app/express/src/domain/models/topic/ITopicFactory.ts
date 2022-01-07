import type { Topic } from './Topic';

export interface ITopicFactory {
  create: (argsObj: {
    chapterNumValue: number;
    partNumValue: number;
    sectionNumValue: number;
    subsectionNumValue: number;
    topicCharValue: string;
    topicTitleValue: string | null;
  }) => Topic;
}
