import type { IChapterRepository } from '../../domain/models/chapter/IChapterRepository';
import type { IPartRepository } from '../../domain/models/part/IPartRepository';
import type { ISectionRepository } from '../../domain/models/section/ISectionRepository';
import type { ISubsectionRepository } from '../../domain/models/subsection/ISubsectionRepository';
import type { ITopicRepository } from '../../domain/models/topic/ITopicRepository';
import type { ITopicFactory } from '../../domain/models/topic/ITopicFactory';
import { ChapterNum } from '../../domain/models/chapter/ChapterNum';
import { PartNum } from '../../domain/models/part/PartNum';
import { SectionNum } from '../../domain/models/section/SectionNum';
import { SubsectionNum } from '../../domain/models/subsection/SubsectionNum';
import { TopicChar } from '../../domain/models/topic/TopicChar';
import { TopicTitle } from '../../domain/models/topic/TopicTitle';
import { TopicDTO } from './TopicDTO';

export class TopicApplicationService {
  private readonly chapterRepository: IChapterRepository;

  private readonly partRepository: IPartRepository;

  private readonly sectionRepository: ISectionRepository;

  private readonly subsectionRepository: ISubsectionRepository;

  private readonly topicRepository: ITopicRepository;

  private readonly topicFactory: ITopicFactory;

  constructor(argsObj: {
    chapterRepository: IChapterRepository;
    partRepository: IPartRepository;
    sectionRepository: ISectionRepository;
    subsectionRepository: ISubsectionRepository;
    topicRepository: ITopicRepository;
    topicFactory: ITopicFactory;
  }) {
    this.chapterRepository = argsObj.chapterRepository;
    this.partRepository = argsObj.partRepository;
    this.sectionRepository = argsObj.sectionRepository;
    this.subsectionRepository = argsObj.subsectionRepository;
    this.topicRepository = argsObj.topicRepository;
    this.topicFactory = argsObj.topicFactory;
  }

  register = async (argsObj: {
    chapterNumValue: number;
    partNumValue: number;
    sectionNumValue: number;
    subsectionNumValue: number;
    topicCharValue: string;
    topicTitleValue: string | null;
  }) => {
    const { chapterNumValue, partNumValue, sectionNumValue, subsectionNumValue, topicCharValue, topicTitleValue } =
      argsObj;

    const chapterNum = new ChapterNum(chapterNumValue);
    const partNum = new PartNum(partNumValue);
    const sectionNum = new SectionNum(sectionNumValue);
    const subsectionNum = new SubsectionNum(subsectionNumValue);

    const chapterPromise = this.chapterRepository.findOne(chapterNum);
    const partPromise = this.partRepository.findOne(chapterNum, partNum);
    const sectionPromise = this.sectionRepository.findOne({ chapterNum, partNum, sectionNum });
    const subsectionPromise = this.subsectionRepository.findOne({ chapterNum, partNum, sectionNum, subsectionNum });

    const [chapter, part, section, subsection] = await Promise.all([
      chapterPromise,
      partPromise,
      sectionPromise,
      subsectionPromise,
    ]);

    if (!chapter) {
      throw new Error('chapterNumに対応するchapterが存在しません');
    }

    if (!part) {
      throw new Error('chapterNumとpartNumValueに対応するpartが存在しません');
    }

    if (!section) {
      throw new Error('chapterNum, partNumValue, sectionNumに対応するsectionが存在しません');
    }

    if (!subsection) {
      throw new Error('chapterNum, partNumValue, sectionNum, subsectionNumに対応するsubsectionが存在しません');
    }

    const topic = this.topicFactory.create({
      chapterNumValue,
      partNumValue,
      sectionNumValue,
      subsectionNumValue,
      topicCharValue,
      topicTitleValue,
    });

    await this.topicRepository.save(topic);
  };

  findOne = async (argsObj: {
    chapterNumValue: number;
    partNumValue: number;
    sectionNumValue: number;
    subsectionNumValue: number;
    topicCharValue: string;
  }) => {
    const chapterNum = new ChapterNum(argsObj.chapterNumValue);
    const partNum = new PartNum(argsObj.partNumValue);
    const sectionNum = new SectionNum(argsObj.sectionNumValue);
    const subsectionNum = new SubsectionNum(argsObj.subsectionNumValue);
    const topicChar = new TopicChar(argsObj.topicCharValue);

    const topic = await this.topicRepository.findOne({
      chapterNum,
      partNum,
      sectionNum,
      subsectionNum,
      topicChar,
    });

    if (!topic) {
      return null;
    }

    const topicDTO = new TopicDTO(topic);

    return topicDTO;
  };

  findAll = async () => {
    const topics = await this.topicRepository.findAll();

    const arrayOfTopicDTO = topics.map((topic) => new TopicDTO(topic));

    return arrayOfTopicDTO;
  };

  findBySubsection = async (argsObj: {
    chapterNumValue: number;
    partNumValue: number;
    sectionNumValue: number;
    subsectionNumValue: number;
  }) => {
    const chapterNum = new ChapterNum(argsObj.chapterNumValue);
    const partNum = new PartNum(argsObj.partNumValue);
    const sectionNum = new SectionNum(argsObj.sectionNumValue);
    const subsectionNum = new SubsectionNum(argsObj.subsectionNumValue);

    const topics = await this.topicRepository.findBySubsection({ chapterNum, partNum, sectionNum, subsectionNum });

    const arrayOfTopicDTO = topics.map((topic) => new TopicDTO(topic));

    return arrayOfTopicDTO;
  };

  update = async (argsObj: {
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

    const topic = await this.topicRepository.findOne({ chapterNum, partNum, sectionNum, subsectionNum, topicChar });

    if (!topic) {
      throw new Error(
        'chapterNumValue, partNumValue, sectionNumValue, subsectionNum, topicCharに対応するtopicが存在しません'
      );
    }

    const newTopicTitle = new TopicTitle(argsObj.topicTitleValue);

    topic.changeTitle(newTopicTitle);

    await this.topicRepository.save(topic);
  };

  delete = async (argsObj: {
    chapterNumValue: number;
    partNumValue: number;
    sectionNumValue: number;
    subsectionNumValue: number;
    topicCharValue: string;
  }) => {
    const chapterNum = new ChapterNum(argsObj.chapterNumValue);
    const partNum = new PartNum(argsObj.partNumValue);
    const sectionNum = new SectionNum(argsObj.sectionNumValue);
    const subsectionNum = new SubsectionNum(argsObj.subsectionNumValue);
    const topicChar = new TopicChar(argsObj.topicCharValue);

    const topic = await this.topicRepository.findOne({ chapterNum, partNum, sectionNum, subsectionNum, topicChar });

    if (!topic) {
      throw new Error(
        'chapterNumValue, partNumValue, sectionNumValue, subsectionNum, topicCharに対応するtopicが存在しません'
      );
    }

    await this.topicRepository.delete(topic);
  };
}
