import type { ITextFactory } from '../../domain/models/text/ITextFactory';
import type { IChapterRepository } from '../../domain/models/chapter/IChapterRepository';
import type { IPartRepository } from '../../domain/models/part/IPartRepository';
import type { ISectionRepository } from '../../domain/models/section/ISectionRepository';
import type { ISubsectionRepository } from '../../domain/models/subsection/ISubsectionRepository';
import type { ITopicRepository } from '../../domain/models/topic/ITopicRepository';
import type { IChapterFactory } from '../../domain/models/chapter/IChapterFactory';
import type { IPartFactory } from '../../domain/models/part/IPartFactory';
import type { ISectionFactory } from '../../domain/models/section/ISectionFactory';
import type { ISubsectionFactory } from '../../domain/models/subsection/ISubSectionFactory';
import type { ITopicFactory } from '../../domain/models/topic/ITopicFactory';
import { ChapterNum } from '../../domain/models/chapter/ChapterNum';
import { PartNum } from '../../domain/models/part/PartNum';
import { SectionNum } from '../../domain/models/section/SectionNum';
import { SubsectionNum } from '../../domain/models/subsection/SubsectionNum';
import { TopicChar } from '../../domain/models/topic/TopicChar';
import { Line } from '../../domain/models/text/Line';
import { TextNum } from '../../domain/models/text/TextNum';
import { TextBody } from '../../domain/models/text/TextBody';
import { Text } from '../../domain/models/text/Text';

export class TextFactory implements ITextFactory {
  private readonly chapterRepository: IChapterRepository;

  private readonly partRepository: IPartRepository;

  private readonly sectionRepository: ISectionRepository;

  private readonly subsectionRepository: ISubsectionRepository;

  private readonly topicRepository: ITopicRepository;

  private readonly chapterFactory: IChapterFactory;

  private readonly partFactory: IPartFactory;

  private readonly sectionFactory: ISectionFactory;

  private readonly subsectionFactory: ISubsectionFactory;

  private readonly topicFactory: ITopicFactory;

  constructor(argsObj: {
    chapterRepository: IChapterRepository;
    partRepository: IPartRepository;
    sectionRepository: ISectionRepository;
    subsectionRepository: ISubsectionRepository;
    topicRepository: ITopicRepository;
    chapterFactory: IChapterFactory;
    partFactory: IPartFactory;
    sectionFactory: ISectionFactory;
    subsectionFactory: ISubsectionFactory;
    topicFactory: ITopicFactory;
  }) {
    this.chapterRepository = argsObj.chapterRepository;
    this.partRepository = argsObj.partRepository;
    this.sectionRepository = argsObj.sectionRepository;
    this.subsectionRepository = argsObj.subsectionRepository;
    this.topicRepository = argsObj.topicRepository;
    this.chapterFactory = argsObj.chapterFactory;
    this.partFactory = argsObj.partFactory;
    this.sectionFactory = argsObj.sectionFactory;
    this.subsectionFactory = argsObj.subsectionFactory;
    this.topicFactory = argsObj.topicFactory;
  }

  create = async (argsObj: {
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
  }) => {
    const {
      chapterNumValue,
      chapterTitleValue,
      partNumValue,
      partTitleValue,
      sectionNumValue,
      sectionTitleValue,
      subsectionNumValue,
      subsectionTitleValue,
      topicCharValue,
      topicTitleValue,
      lineValue,
      textNumValue,
      textBodyValue,
    } = argsObj;

    const chapterPromise = chapterTitleValue
      ? this.chapterFactory.create(chapterNumValue, chapterTitleValue)
      : this.chapterRepository.find(new ChapterNum(chapterNumValue));

    const partPromise = partTitleValue
      ? this.partFactory.create({ chapterNumValue, partNumValue, partTitleValue })
      : this.partRepository.find(new ChapterNum(chapterNumValue), new PartNum(partNumValue));

    const sectionPromise = sectionTitleValue
      ? this.sectionFactory.create({ chapterNumValue, partNumValue, sectionNumValue, sectionTitleValue })
      : this.sectionRepository.find({
          chapterNum: new ChapterNum(chapterNumValue),
          partNum: new PartNum(partNumValue),
          sectionNum: new SectionNum(sectionNumValue),
        });

    const subsectionPromise = subsectionTitleValue
      ? this.subsectionFactory.create({
          chapterNumValue,
          partNumValue,
          sectionNumValue,
          subsectionNumValue,
          subsectionTitleValue,
        })
      : this.subsectionRepository.find({
          chapterNum: new ChapterNum(chapterNumValue),
          partNum: new PartNum(partNumValue),
          sectionNum: new SectionNum(sectionNumValue),
          subsectionNum: new SubsectionNum(subsectionNumValue),
        });

    const topicPromise = topicTitleValue
      ? this.topicFactory.create({
          chapterNumValue,
          partNumValue,
          sectionNumValue,
          subsectionNumValue,
          topicCharValue,
          topicTitleValue,
        })
      : this.topicRepository.find({
          chapterNum: new ChapterNum(chapterNumValue),
          partNum: new PartNum(partNumValue),
          sectionNum: new SectionNum(sectionNumValue),
          subsectionNum: new SubsectionNum(subsectionNumValue),
          topicChar: new TopicChar(topicCharValue),
        });

    const [chapter, part, section, subsection, topic] = await Promise.all([
      chapterPromise,
      partPromise,
      sectionPromise,
      subsectionPromise,
      topicPromise,
    ]);

    if (!chapter) {
      throw new Error(`${chapterNumValue}に対応するchapterが見つかりませんでした`);
    }

    if (!part) {
      throw new Error(`${partNumValue}に対応するpartが見つかりませんでした`);
    }

    if (!section) {
      throw new Error(`${sectionNumValue}に対応するsectionが見つかりませんでした`);
    }

    if (!subsection) {
      throw new Error(`${subsectionNumValue}に対応するsubsectionが見つかりませんでした`);
    }

    if (!topic) {
      throw new Error(`${topicCharValue}に対応するtopicが見つかりませんでした`);
    }

    const line = new Line(lineValue);

    const textNum = new TextNum(textNumValue);

    const textBody = new TextBody(textBodyValue);

    const text = new Text({
      chapter,
      part,
      section,
      subsection,
      topic,
      line,
      textNum,
      textBody,
    });

    return text;
  };
}
