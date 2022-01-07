/* eslint-disable no-unused-vars */
import express from 'express';
import { subsectionApplicationService } from '../application';
import { convertStringToNumber } from '../utility/functions/convertStringToNumber';
import type { CustomReq } from '../types';

const subsectionRouter = express.Router();

subsectionRouter.get('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum, sectionNum, subsectionNum } = req.query;

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

    if (subsectionNum === undefined) {
      res.status(400);
      return res.send('subsectionNumがundefinedです');
    }

    const convertedChapterNum = convertStringToNumber(chapterNum);
    const convertedPartNum = convertStringToNumber(partNum);
    const convertedSectionNum = convertStringToNumber(sectionNum);
    const convertedSubsectionNum = convertStringToNumber(subsectionNum);

    const result = await subsectionApplicationService.findOne({
      chapterNumValue: convertedChapterNum,
      partNumValue: convertedPartNum,
      sectionNumValue: convertedSectionNum,
      subsectionNumValue: convertedSubsectionNum,
    });

    return res.json(result);
  })().catch(next);
});

subsectionRouter.post('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum, sectionNum, subsectionNum, subsectionTitle } = req.body;

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

    if (subsectionNum === undefined) {
      res.status(400);
      return res.send('subsectionNumがundefinedです');
    }

    if (subsectionTitle === undefined) {
      res.status(400);
      return res.send('subsectionTitleがundefinedです');
    }

    await subsectionApplicationService.register({
      chapterNumValue: chapterNum,
      partNumValue: partNum,
      sectionNumValue: sectionNum,
      subsectionNumValue: subsectionNum,
      subsectionTitleValue: subsectionTitle,
    });

    return res.send('subsectionを保存しました');
  })().catch(next);
});

subsectionRouter.put('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum, sectionNum, subsectionNum, subsectionTitle } = req.body;

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

    if (subsectionNum === undefined) {
      res.status(400);
      return res.send('subsectionNumがundefinedです');
    }

    if (subsectionTitle === undefined) {
      res.status(400);
      return res.send('subsectionTitleがundefinedです');
    }

    await subsectionApplicationService.update({
      chapterNumValue: chapterNum,
      partNumValue: partNum,
      sectionNumValue: sectionNum,
      subsectionNumValue: subsectionNum,
      subsectionTitleValue: subsectionTitle,
    });

    return res.send('subsectionを更新しました');
  })().catch(next);
});

subsectionRouter.delete('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum, sectionNum, subsectionNum } = req.query;

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

    if (subsectionNum === undefined) {
      res.status(400);
      return res.send('subsectionNumがundefinedです');
    }

    const convertedChapterNum = convertStringToNumber(chapterNum);
    const convertedPartNum = convertStringToNumber(partNum);
    const convertedSectionNum = convertStringToNumber(sectionNum);
    const convertedSubsectionNum = convertStringToNumber(subsectionNum);

    await subsectionApplicationService.delete({
      chapterNumValue: convertedChapterNum,
      partNumValue: convertedPartNum,
      sectionNumValue: convertedSectionNum,
      subsectionNumValue: convertedSubsectionNum,
    });

    return res.send('subsectionを削除しました');
  })().catch(next);
});

export { subsectionRouter };
