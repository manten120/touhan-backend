import { ChapterNum } from '../chapter/ChapterNum';
import { PartNum } from '../part/PartNum';
import { SectionNum } from '../section/SectionNum';
import { SubsectionNum } from '../subsection/SubsectionNum';
import { TopicChar } from '../topic/TopicChar';
import { Line } from './Line';
import { TextNum } from './TextNum';
import { TextBody } from './TextBody';


export class Text {
  readonly chapterNum: ChapterNum;

  readonly partNum: PartNum;

  readonly sectionNum: SectionNum;

  readonly subsectionNum: SubsectionNum;

  readonly topicChar: TopicChar;

  readonly line: Line;

  readonly textNum: TextNum;

  readonly textBody: TextBody;

  constructor(argsObj: {
    chapterNum: ChapterNum;
    partNum: PartNum;
    sectionNum: SectionNum;
    subsectionNum: SubsectionNum;
    topicChar: TopicChar;
    line: Line;
    textNum: TextNum;
    textBody: TextBody;
  }) {
    this.chapterNum = argsObj.chapterNum;
    this.partNum = argsObj.partNum;
    this.sectionNum = argsObj.sectionNum;
    this.subsectionNum = argsObj.subsectionNum;
    this.topicChar = argsObj.topicChar;
    this.line = argsObj.line;
    this.textNum = argsObj.textNum;
    this.textBody = argsObj.textBody;
  }
}
