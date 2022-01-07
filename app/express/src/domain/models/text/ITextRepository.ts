import type { ChapterNum } from '../chapter/ChapterNum';
import type { PartNum } from '../part/PartNum';
import type { SectionNum } from '../section/SectionNum';
import type { SubsectionNum } from '../subsection/SubsectionNum';
import type { TopicChar } from '../topic/TopicChar';
import type { Line } from './Line';
import type { TextNum } from './TextNum';
import type { Text } from './Text';

export interface ITextRepository {
  save: (text: Text) => Promise<void>;
  find: (argsObj: {
    chapterNum: ChapterNum;
    partNum: PartNum;
    sectionNum: SectionNum;
    subsectionNum: SubsectionNum;
    topicChar: TopicChar;
    line: Line;
    textNum: TextNum;
  }) => Promise<Text | null>;
}
