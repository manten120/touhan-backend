/* eslint-disable no-unused-vars */
import express from 'express';
import { CannotAttachTreeChildrenEntityError, getConnection } from 'typeorm';

// import { ChapterORMEntity, PartORMEntity, SectionORMEntity, SubsectionORMEntity, TopicORMEntity, TextORMEntity, ProductORMEntity, } from '../orm'

import { ChapterORMEntity, PartORMEntity } from '../orm'

import type { GetReq, PostReq } from '../types';

const editRouter = express.Router();

editRouter.get('/', (_req, res, _next) => {
  res.render('edit');
})

editRouter.post('/', (req: PostReq, res, next) => {
  (async () => {
    const { chapterNum, chapterTitle, partNum, partTitle, sectionNum, sectionTitle, subsectionNum, subsectionTitle, topicChar, topicTitle } = req.body;

    if(!chapterNum) {
      return res.send('chapterNumを入力してください')
    }

    if(!chapterTitle) {
      return res.send('chapterTitleを入力してください')
    }

    if(!partNum) {
      return res.send('partNumを入力してください')
    }

    if(!partTitle) {
      return res.send('partTitleを入力してください')
    }

    // if(!sectionNum) {
    //   return res.send('partTitleを入力してください')
    // }

    // if(!sectionTitle) {
    //   return res.send('sectionTitleを入力してください')
    // }

    // if(!subsectionNum) {
    //   return res.send('subsectionNumを入力してください')
    // }

    // if(!subsectionTitle) {
    //   return res.send('subsectionTitleを入力してください')
    // }

    // if(!topicChar) {
    //   return res.send('topicCharを入力してください')
    // }

    // if(!topicTitle) {
    //   return res.send('topicTitleを入力してください')
    // }

    try {
      const chapterData = new ChapterORMEntity();
      chapterData.num = chapterNum;
      chapterData.title = chapterTitle;
  
      const chaptersTable = getConnection().getRepository(ChapterORMEntity);
      await chaptersTable.save(chapterData);
  
      const partData = new PartORMEntity();
      partData.num = partNum;
      partData.chapter_num = chapterNum;
      partData.title = partTitle;
  
      const partsTable = getConnection().getRepository(PartORMEntity);
      await partsTable.save(partData);
  
      const response = `保存しました`;
      return res.send(response);
    } catch(e) {
      const response = `保存中になにかエラー`
      return res.send(response);
    }

  })().catch(next);
});

export { editRouter };
