import { getConnection } from 'typeorm';
import { TopicORMEntity } from '../../orm';
import type { ITopicRepository } from '../../domain/models/topic/ITopicRepository';
import type { ITopicFactory } from '../../domain/models/topic/ITopicFactory';
import type { ChapterNum } from '../../domain/models/chapter/ChapterNum';
import type { PartNum } from '../../domain/models/part/PartNum';
import type { SectionNum } from '../../domain/models/section/SectionNum';
import type { SubsectionNum } from '../../domain/models/subsection/SubsectionNum';
import type { TopicChar } from '../../domain/models/topic/TopicChar';
import type { Topic } from '../../domain/models/topic/Topic';

export class TopicRepository implements ITopicRepository {
  private readonly topicFactory: ITopicFactory;

  constructor(topicFactory: ITopicFactory) {
    this.topicFactory = topicFactory;
  }

  // eslint-disable-next-line class-methods-use-this
  save = async (topic: Topic) => {
    const topicsTable = getConnection().getRepository(TopicORMEntity);

    const topicData = new TopicORMEntity();
    topicData.chapter_num = topic.chapterNum.value;
    topicData.part_num = topic.partNum.value;
    topicData.section_num = topic.sectionNum.value;
    topicData.subsection_num = topic.subsectionNum.value;
    topicData.char = topic.char.value;
    topicData.title = topic.title.value;

    await topicsTable.save(topicData);
  };

  findOne = async (argsObj: {
    chapterNum: ChapterNum;
    partNum: PartNum;
    sectionNum: SectionNum;
    subsectionNum: SubsectionNum;
    topicChar: TopicChar;
  }) => {
    const topicsTable = getConnection().getRepository(TopicORMEntity);

    const topicData = await topicsTable.findOne({
      where: {
        chapter_num: argsObj.chapterNum.value,
        part_num: argsObj.partNum.value,
        section_num: argsObj.sectionNum.value,
        subsection_num: argsObj.subsectionNum.value,
        char: argsObj.topicChar.value,
      },
    });

    if (!topicData) {
      return null;
    }

    const topic = this.topicFactory.create({
      chapterNumValue: topicData.chapter_num,
      partNumValue: topicData.part_num,
      sectionNumValue: topicData.section_num,
      subsectionNumValue: topicData.subsection_num,
      topicCharValue: topicData.char,
      topicTitleValue: topicData.title,
    });

    return topic;
  };

  findAll = async () => {
    const topicsTable = getConnection().getRepository(TopicORMEntity);

    const topicsData = await topicsTable.find();

    const topics = topicsData.map((topicData) =>
      this.topicFactory.create({
        chapterNumValue: topicData.chapter_num,
        partNumValue: topicData.part_num,
        sectionNumValue: topicData.section_num,
        subsectionNumValue: topicData.subsection_num,
        topicCharValue: topicData.char,
        topicTitleValue: topicData.title,
      })
    );

    return topics;
  };

  findBySubsection = async (argsObj: {
    chapterNum: ChapterNum;
    partNum: PartNum;
    sectionNum: SectionNum;
    subsectionNum: SubsectionNum;
  }) => {
    const topicsTable = getConnection().getRepository(TopicORMEntity);

    const topicsData = await topicsTable.find({
      where: {
        chapter_num: argsObj.chapterNum.value,
        part_num: argsObj.partNum.value,
        section_num: argsObj.sectionNum.value,
        subsection_num: argsObj.subsectionNum.value,
      },
    });

    const topics = topicsData.map((topicData) =>
      this.topicFactory.create({
        chapterNumValue: topicData.chapter_num,
        partNumValue: topicData.part_num,
        sectionNumValue: topicData.section_num,
        subsectionNumValue: topicData.subsection_num,
        topicCharValue: topicData.char,
        topicTitleValue: topicData.title,
      })
    );

    return topics;
  };

  // eslint-disable-next-line class-methods-use-this
  delete = async (topic: Topic) => {
    const topicsTable = getConnection().getRepository(TopicORMEntity);

    const result = await topicsTable.delete({
      chapter_num: topic.chapterNum.value,
      part_num: topic.partNum.value,
      section_num: topic.sectionNum.value,
      subsection_num: topic.subsectionNum.value,
      char: topic.char.value,
    });
    if (!result) {
      throw new Error('削除しようとしたsubsectionは存在しません');
    }
  };
}
