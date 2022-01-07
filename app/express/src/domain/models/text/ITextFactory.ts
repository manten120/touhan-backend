import type { Text } from './Text';

export interface ITextFactory {
  create: (argsObj: {
    chapterNumValue: number;
    chapterTitleValue?: string;
    partNumValue: number;
    partTitleValue?: string;
    sectionNumValue: number;
    sectionTitleValue?: string;
    subsectionNumValue: number;
    subsectionTitleValue?: string;
    topicCharValue: string;
    topicTitleValue?: string;
    lineValue: number;
    textNumValue: number;
    textBodyValue: string;
  }) => Promise<Text>;
}
