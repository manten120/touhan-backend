/* eslint-disable no-unused-vars */
import express from 'express';
import { topicApplicationService } from '../application';
import { convertStringToNumber } from '../utility/functions/convertStringToNumber';
import type { CustomReq } from '../types';

const topicRouter = express.Router();

topicRouter.get('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum, sectionNum, subsectionNum, topicChar } = req.query;

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

    if (topicChar === undefined) {
      res.status(400);
      return res.send('topicCharがundefinedです');
    }

    const convertedChapterNum = convertStringToNumber(chapterNum);
    const convertedPartNum = convertStringToNumber(partNum);
    const convertedSectionNum = convertStringToNumber(sectionNum);
    const convertedSubsectionNum = convertStringToNumber(subsectionNum);

    const result = await topicApplicationService.findOne({
      chapterNumValue: convertedChapterNum,
      partNumValue: convertedPartNum,
      sectionNumValue: convertedSectionNum,
      subsectionNumValue: convertedSubsectionNum,
      topicCharValue: topicChar,
    });

    return res.json(result);
  })().catch(next);
});

topicRouter.post('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum, sectionNum, subsectionNum, subsectionTitle, topicChar, topicTitle } = req.body;

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

    if (topicChar === undefined) {
      res.status(400);
      return res.send('topicCharがundefinedです');
    }

    if (topicTitle === undefined) {
      res.status(400);
      return res.send('topicTitleがundefinedです');
    }

    await topicApplicationService.register({
      chapterNumValue: chapterNum,
      partNumValue: partNum,
      sectionNumValue: sectionNum,
      subsectionNumValue: subsectionNum,
      topicCharValue: topicChar,
      topicTitleValue: topicTitle,
    });

    return res.send('topicを保存しました');
  })().catch(next);
});

topicRouter.put('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum, sectionNum, subsectionNum, subsectionTitle, topicChar, topicTitle } = req.body;

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

    if (topicChar === undefined) {
      res.status(400);
      return res.send('topicCharがundefinedです');
    }

    if (topicTitle === undefined) {
      res.status(400);
      return res.send('topicTitleがundefinedです');
    }

    await topicApplicationService.update({
      chapterNumValue: chapterNum,
      partNumValue: partNum,
      sectionNumValue: sectionNum,
      subsectionNumValue: subsectionNum,
      topicCharValue: topicChar,
      topicTitleValue: topicTitle,
    });

    return res.send('topicを更新しました');
  })().catch(next);
});

topicRouter.delete('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum, sectionNum, subsectionNum, topicChar } = req.query;

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

    if (topicChar === undefined) {
      res.status(400);
      return res.send('topicCharがundefinedです');
    }

    const convertedChapterNum = convertStringToNumber(chapterNum);
    const convertedPartNum = convertStringToNumber(partNum);
    const convertedSectionNum = convertStringToNumber(sectionNum);
    const convertedSubsectionNum = convertStringToNumber(subsectionNum);

    await topicApplicationService.delete({
      chapterNumValue: convertedChapterNum,
      partNumValue: convertedPartNum,
      sectionNumValue: convertedSectionNum,
      subsectionNumValue: convertedSubsectionNum,
      topicCharValue: topicChar,
    });

    return res.send('topicを削除しました');
  })().catch(next);
});

export { topicRouter };
