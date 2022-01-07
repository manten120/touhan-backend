import { getConnection } from 'typeorm';
import { TextORMEntity } from '../../orm';
import type { ITextFactory } from '../../domain/models/text/ITextFactory';
import type { ITextRepository } from '../../domain/models/text/ITextRepository';
import type { Text } from '../../domain/models/text/Text';
import type { TopicChar } from '../../domain/models/topic/TopicChar';
import type { Line } from '../../domain/models/text/Line';
import type { TextNum } from '../../domain/models/text/TextNum';
import type { ChapterNum } from '../../domain/models/chapter/ChapterNum';
import type { PartNum } from '../../domain/models/part/PartNum';
import type { SectionNum } from '../../domain/models/section/SectionNum';
import type { SubsectionNum } from '../../domain/models/subsection/SubsectionNum';

export class TextRepository implements ITextRepository {
  private readonly textFactory: ITextFactory;

  constructor(textFactory: ITextFactory) {
    this.textFactory = textFactory;
  }

  // eslint-disable-next-line class-methods-use-this
  save = async (text: Text) => {
    const textsTable = getConnection().getRepository(TextORMEntity);

    const textData = new TextORMEntity();
    textData.chapter_num = text.chapter.num.value;
    textData.part_num = text.part.num.value;
    textData.section_num = text.section.num.value;
    textData.subsection_num = text.subsection.num.value;
    textData.topic_char = text.topic.char.value;
    textData.line = text.line.value;
    textData.num = text.num.value;
    textData.body = text.body.value;

    await textsTable.save(textData);
  };

  find = async (argsObj: {
    chapterNum: ChapterNum;
    partNum: PartNum;
    sectionNum: SectionNum;
    subsectionNum: SubsectionNum;
    topicChar: TopicChar;
    line: Line;
    textNum: TextNum;
  }) => {
    const textsTable = getConnection().getRepository(TextORMEntity);

    const textData = await textsTable.findOne({
      where: {
        chapter_num: argsObj.chapterNum.value,
        part_num: argsObj.partNum.value,
        section_num: argsObj.sectionNum.value,
        subsection_num: argsObj.subsectionNum.value,
        topic_char: argsObj.topicChar.value,
        line: argsObj.line.value,
        text_num: argsObj.textNum.value,
      },
    });

    if (!textData) {
      return null;
    }

    const text = await this.textFactory.create({
      chapterNumValue: textData.chapter_num,
      partNumValue: textData.part_num,
      sectionNumValue: textData.section_num,
      subsectionNumValue: textData.subsection_num,
      topicCharValue: textData.topic_char,
      lineValue: textData.line,
      textNumValue: textData.num,
      textBodyValue: textData.body,
    });

    return text;
  };
}
