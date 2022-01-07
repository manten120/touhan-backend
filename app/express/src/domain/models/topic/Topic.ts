import { ChapterNum } from '../chapter/ChapterNum';
import { PartNum } from '../part/PartNum';
import { SectionNum } from '../section/SectionNum';
import { SubsectionNum } from '../subsection/SubsectionNum';
import { TopicChar } from './TopicChar';
import { TopicTitle } from './TopicTitle';

export class Topic {
  readonly chapterNum: ChapterNum;

  readonly partNum: PartNum;

  readonly sectionNum: SectionNum;

  readonly subsectionNum: SubsectionNum;

  readonly topicChar: TopicChar;

  readonly topicTitle: TopicTitle;

  constructor(argsObj: {
    chapterNum: ChapterNum;
    partNum: PartNum;
    sectionNum: SectionNum;
    subsectionNum: SubsectionNum;
    topicChar: TopicChar;
    topicTitle: TopicTitle;
  }) {
    if (argsObj.topicChar.value === 'z' && argsObj.topicTitle !== null) {
      throw new Error('TopicCharの値が"z"のときTopicTitleの値はnullです');
    }

    this.chapterNum = argsObj.chapterNum;
    this.partNum = argsObj.partNum;
    this.sectionNum = argsObj.sectionNum;
    this.subsectionNum = argsObj.subsectionNum;
    this.topicChar = argsObj.topicChar;
    this.topicTitle = argsObj.topicTitle;
  }
}
