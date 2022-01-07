/* eslint-disable no-unused-vars */
import express from 'express';
import { partApplicationService } from '../application';
import { convertStringToNumber } from '../utility/functions/convertStringToNumber';
import type { CustomReq } from '../types';

const partRouter = express.Router();

partRouter.get('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum } = req.query;

    if (chapterNum === undefined) {
      res.status(400)
      return res.send('chapterNumがundefinedです');
    }

    if (partNum === undefined) {
      res.status(400)
      return res.send('partNumがundefinedです');
    }

    const convertedChapterNum = convertStringToNumber(chapterNum);
    const convertedPartNum = convertStringToNumber(partNum);

    const partDTO = await partApplicationService.find(convertedChapterNum, convertedPartNum);

    return res.json(partDTO);
  })().catch(next);
});

partRouter.post('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum, partTitle } = req.body;

    if (chapterNum === undefined) {
      res.status(400)
      return res.send('chapterNumがundefinedです');
    }

    if (partNum === undefined) {
      res.status(400)
      return res.send('partNumがundefinedです');
    }

    if (partTitle === undefined) {
      res.status(400)
      return res.send('partTitleがundefinedです');
    }

    await partApplicationService.register({
      chapterNumValue: chapterNum,
      partNumValue: partNum,
      partTitleValue: partTitle,
    });

    return res.send('partを保存しました');
  })().catch(next);
});

partRouter.put('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum, partTitle } = req.body;

    if (chapterNum === undefined) {
      res.status(400)
      return res.send('chapterNumがundefinedです');
    }

    if (partNum === undefined) {
      res.status(400)
      return res.send('partNumがundefinedです');
    }

    if (partTitle === undefined) {
      res.status(400)
      return res.send('partTitleがundefinedです');
    }

    await partApplicationService.update({
      chapterNumValue: chapterNum,
      partNumValue: partNum,
      partTitleValue: partTitle,
    });

    return res.send('partを更新しました');
  })().catch(next);
});

partRouter.delete('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum } = req.query;

    if (chapterNum === undefined) {
      res.status(400)
      return res.send('chapterNumがundefinedです');
    }

    if (partNum === undefined) {
      res.status(400)
      return res.send('partNumがundefinedです');
    }

    const convertedChapterNum = convertStringToNumber(chapterNum);
    const convertedPartNum = convertStringToNumber(partNum);

    await partApplicationService.delete(convertedChapterNum, convertedPartNum);

    return res.send('chapterを削除しました');
  })().catch(next);
});

export { partRouter };
