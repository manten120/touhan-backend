/* eslint-disable no-unused-vars */
import express from 'express';
import { chapterApplicationService } from '../../application';
import { convertStringToNumber } from '../../utility/functions/convertStringToNumber';
import type { CustomReq } from '../../types';

const manageChapterRouter = express.Router();

manageChapterRouter.get('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum } = req.query;
    if (chapterNum === undefined) {
      return res.send('chapterNumがundefinedです');
    }
    const convertedChapterNum = convertStringToNumber(chapterNum);
    const chapterDTO = await chapterApplicationService.find(convertedChapterNum);
    return res.json(chapterDTO);
  })().catch(next);
});

manageChapterRouter.get('/all', (_req, res, next) => {
  (async () => {
    const arrayOfChapterDTO = await chapterApplicationService.findAll();
    res.json(arrayOfChapterDTO);
  })().catch(next);
});

manageChapterRouter.post('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, chapterTitle } = req.body;

    if (chapterNum === undefined) {
      return res.send('chapterNumがundefinedです');
    }

    if (chapterTitle === undefined) {
      return res.send('chapterTitleがundefinedです');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await chapterApplicationService.register(chapterNum, chapterTitle);

    return res.send('chapterを保存しました');
  })().catch(next);
});

manageChapterRouter.put('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, chapterTitle } = req.body;

    if (chapterNum === undefined) {
      return res.send('chapterNumがundefinedです');
    }

    if (chapterTitle === undefined) {
      return res.send('chapterTitleがundefinedです');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await chapterApplicationService.update(chapterNum, chapterTitle);

    return res.send('chapterを更新しました');
  })().catch(next);
});

manageChapterRouter.delete('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum } = req.query;

    if (chapterNum === undefined) {
      return res.send('chapterNumがundefinedです');
    }

    const convertedChapterNum = convertStringToNumber(chapterNum);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await chapterApplicationService.delete(convertedChapterNum);

    return res.send('chapterを削除しました');
  })().catch(next);
});

export { manageChapterRouter };
