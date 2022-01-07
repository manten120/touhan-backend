import express from 'express';
import { chapterApplicationService } from '../application';
import type { CustomReq } from '../types';
import { convertStringToNumber } from '../utility/functions/convertStringToNumber';

const chapterRouter = express.Router();

chapterRouter.get('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum } = req.query;

    if (chapterNum === undefined) {
      res.status(400); // 400 Bad Request 一般的なクライアントエラー
      return res.send('chapterNumがundefinedです');
    }

    const convertedChapterNum = convertStringToNumber(chapterNum);

    const result = await chapterApplicationService.findOne(convertedChapterNum);

    return res.json(result);
  })().catch(next);
});

chapterRouter.post('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, chapterTitle } = req.body;

    if (chapterNum === undefined) {
      res.status(400);
      return res.send('chapterNumがundefinedです');
    }

    if (chapterTitle === undefined) {
      res.status(400);
      return res.send('chapterTitleがundefinedです');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await chapterApplicationService.register(chapterNum, chapterTitle);

    return res.send('chapterを保存しました');
  })().catch(next);
});

chapterRouter.put('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, chapterTitle } = req.body;

    if (chapterNum === undefined) {
      res.status(400);
      return res.send('chapterNumがundefinedです');
    }

    if (chapterTitle === undefined) {
      res.status(400);
      return res.send('chapterTitleがundefinedです');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await chapterApplicationService.update(chapterNum, chapterTitle);

    return res.send('chapterを更新しました');
  })().catch(next);
});

chapterRouter.delete('/', (req: CustomReq, res, next) => {
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

export { chapterRouter };
