/* eslint-disable no-unused-vars */
import express from 'express';
import { sectionApplicationService } from '../application';
import { convertStringToNumber } from '../utility/functions/convertStringToNumber';
import type { CustomReq } from '../types';

const sectionRouter = express.Router();

sectionRouter.get('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum, sectionNum } = req.query;

    if (chapterNum === undefined) {
      res.status(400);
      return res.send('chapterNumがundefinedです');
    }

    if (partNum === undefined) {
      res.status(400);
      return res.send('partNumがundefinedです');
    }

    if (sectionNum === undefined) {
      res.status(400);
      return res.send('sectionNumがundefinedです');
    }

    const convertedChapterNum = convertStringToNumber(chapterNum);
    const convertedPartNum = convertStringToNumber(partNum);
    const convertedSectionNum = convertStringToNumber(sectionNum);

    const result = await sectionApplicationService.findOne({
      chapterNumValue: convertedChapterNum,
      partNumValue: convertedPartNum,
      sectionNumValue: convertedSectionNum,
    });

    return res.json(result);
  })().catch(next);
});

sectionRouter.post('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum, sectionNum, sectionTitle } = req.body;

    if (chapterNum === undefined) {
      res.status(400);
      return res.send('chapterNumがundefinedです');
    }

    if (partNum === undefined) {
      res.status(400);
      return res.send('partNumがundefinedです');
    }

    if (sectionNum === undefined) {
      res.status(400);
      return res.send('sectionNumがundefinedです');
    }

    if (sectionTitle === undefined) {
      res.status(400);
      return res.send('sectionTitleがundefinedです');
    }

    await sectionApplicationService.register({
      chapterNumValue: chapterNum,
      partNumValue: partNum,
      sectionNumValue: sectionNum,
      sectionTitleValue: sectionTitle,
    });

    return res.send('sectionを保存しました');
  })().catch(next);
});

sectionRouter.put('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum, sectionNum, sectionTitle } = req.body;

    if (chapterNum === undefined) {
      res.status(400);
      return res.send('chapterNumがundefinedです');
    }

    if (partNum === undefined) {
      res.status(400);
      return res.send('partNumがundefinedです');
    }

    if (sectionNum === undefined) {
      res.status(400);
      return res.send('sectionNumがundefinedです');
    }

    if (sectionTitle === undefined) {
      res.status(400);
      return res.send('sectionTitleがundefinedです');
    }

    await sectionApplicationService.update({
      chapterNumValue: chapterNum,
      partNumValue: partNum,
      sectionNumValue: sectionNum,
      sectionTitleValue: sectionTitle,
    });

    return res.send('sectionを更新しました');
  })().catch(next);
});

sectionRouter.delete('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum, sectionNum } = req.query;

    if (chapterNum === undefined) {
      res.status(400);
      return res.send('chapterNumがundefinedです');
    }

    if (partNum === undefined) {
      res.status(400);
      return res.send('partNumがundefinedです');
    }

    if (sectionNum === undefined) {
      res.status(400);
      return res.send('sectionNumがundefinedです');
    }

    const convertedChapterNum = convertStringToNumber(chapterNum);
    const convertedPartNum = convertStringToNumber(partNum);
    const convertedSectionNum = convertStringToNumber(sectionNum);

    await sectionApplicationService.delete({
      chapterNumValue: convertedChapterNum,
      partNumValue: convertedPartNum,
      sectionNumValue: convertedSectionNum,
    });

    return res.send('sectionを削除しました');
  })().catch(next);
});

export { sectionRouter };
