import { Chapter } from '../chapter/Chapter';
import { Part } from '../part/Part';
import { Section } from '../section/Section';
import { Subsection } from '../subsection/Subsection';
import { Topic } from '../topic/Topic';
import { Line } from './Line';
import { TextNum } from './TextNum';
import { TextBody } from './TextBody';

export class Text {
  readonly chapter: Chapter;

  readonly part: Part;

  readonly section: Section;

  readonly subsection: Subsection;

  readonly topic: Topic;

  readonly line: Line;

  readonly num: TextNum;

  readonly body: TextBody;

  constructor(argsObj: {
    chapter: Chapter;
    part: Part;
    section: Section;
    subsection: Subsection;
    topic: Topic;
    line: Line;
    textNum: TextNum;
    textBody: TextBody;
  }) {
    this.chapter = argsObj.chapter;
    this.part = argsObj.part;
    this.section = argsObj.section;
    this.subsection = argsObj.subsection;
    this.topic = argsObj.topic;
    this.line = argsObj.line;
    this.num = argsObj.textNum;
    this.body = argsObj.textBody;
  }
}
