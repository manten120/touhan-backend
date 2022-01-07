/* eslint-disable no-unused-vars */
import express from 'express';
import { getConnection } from 'typeorm';

import {
  ChapterORMEntity,
  PartORMEntity,
  SectionORMEntity,
  SubsectionORMEntity,
  TopicORMEntity,
  TextORMEntity,
} from '../orm';

import type { CustomReq } from '../types';

const textRouter = express.Router();

textRouter.post('/', (req: CustomReq, res, next) => {
  (async () => {
    const {
      chapterNum,
      chapterTitle,
      partNum,
      partTitle,
      sectionNum,
      sectionTitle,
      subsectionNum,
      subsectionTitle,
      topicChar,
      topicTitle,
      line,
      textNum,
      textBody,
      productId,
    } = req.body;

    if (!chapterNum) {
      return res.send('chapterNumを入力してください');
    }

    if (!chapterTitle) {
      return res.send('chapterTitleを入力してください');
    }

    if (!partNum) {
      return res.send('partNumを入力してください');
    }

    if (!partTitle) {
      return res.send('partTitleを入力してください');
    }

    if (!sectionNum) {
      return res.send('partTitleを入力してください');
    }

    if (!sectionTitle) {
      return res.send('sectionTitleを入力してください');
    }

    if (!subsectionNum) {
      return res.send('subsectionNumを入力してください');
    }

    if (!subsectionTitle) {
      return res.send('subsectionTitleを入力してください');
    }

    if (!topicChar) {
      return res.send('topicCharを入力してください');
    }

    if (!topicTitle) {
      return res.send('topicTitleを入力してください');
    }

    if (!line) {
      return res.send('lineを入力してください');
    }

    if (!textNum) {
      return res.send('sentenceNumを入力してください');
    }

    if (!textBody) {
      return res.send('textを入力してください');
    }

    if (!productId) {
      return res.send('productIdを入力してください');
    }

    try {
      const chaptersTable = getConnection().getRepository(ChapterORMEntity);
      const partsTable = getConnection().getRepository(PartORMEntity);
      const sectionsTable = getConnection().getRepository(SectionORMEntity);
      const subsectionsTable = getConnection().getRepository(SubsectionORMEntity);
      const topicsTable = getConnection().getRepository(TopicORMEntity);
      const textsTable = getConnection().getRepository(TextORMEntity);

      const chapterData = new ChapterORMEntity();
      chapterData.num = chapterNum;
      chapterData.title = chapterTitle;

      await chaptersTable.upsert(chapterData, ['num']);

      const partData = new PartORMEntity();
      partData.chapter_num = chapterNum;
      partData.num = partNum;
      partData.title = partTitle;

      await partsTable.upsert(partData, ['chapter_num', 'num']);

      const sectionData = new SectionORMEntity();
      sectionData.chapter_num = chapterNum;
      sectionData.part_num = partNum;
      sectionData.num = sectionNum;
      sectionData.title = sectionTitle;

      await sectionsTable.upsert(sectionData, ['chapter_num', 'part_num', 'num']);

      const subsectionData = new SubsectionORMEntity();
      subsectionData.chapter_num = chapterNum;
      subsectionData.part_num = partNum;
      subsectionData.section_num = sectionNum;
      subsectionData.num = subsectionNum;
      subsectionData.title = subsectionTitle;

      await subsectionsTable.upsert(subsectionData, ['chapter_num', 'part_num', 'section_num', 'num']);

      const topicData = new TopicORMEntity();
      topicData.chapter_num = chapterNum;
      topicData.part_num = partNum;
      topicData.section_num = sectionNum;
      topicData.subsection_num = subsectionNum;
      topicData.char = topicChar;
      topicData.title = topicTitle;

      await topicsTable.upsert(topicData, ['chapter_num', 'part_num', 'section_num', 'subsection_num', 'char']);

      const textData = new TextORMEntity();
      textData.chapter_num = chapterNum;
      textData.part_num = partNum;
      textData.section_num = sectionNum;
      textData.subsection_num = subsectionNum;
      textData.topic_char = topicChar;
      textData.line = line;
      textData.num = textNum;
      textData.body = textBody;
      textData.product_id = productId;

      await textsTable.upsert(textData, [
        'chapter_num',
        'part_num',
        'section_num',
        'subsection_num',
        'topic_char',
        'line',
        'text_num',
      ]);

      const response = `保存しました`;
      return res.send(response);
    } catch (e: any) {
      const response = `保存中になにかエラー: ${e.message}`;
      return res.send(response);
    }
  })().catch(next);
});

export { textRouter };
