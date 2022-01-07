/* eslint-disable no-unused-vars */
import express from 'express';
import { partApplicationService } from '../application';
import { convertStringToNumber } from '../utility/functions/convertStringToNumber';
import type { CustomReq } from '../types';

const partsRouter = express.Router();

partsRouter.get('/all', (_req, res, next) => {
  (async () => {
    const arrayOfPartDTO = await partApplicationService.findAll();
    res.json(arrayOfPartDTO);
  })().catch(next);
});

partsRouter.get('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum } = req.query;

    if (chapterNum === undefined) {
      res.status(400);
      return res.send('chapterNumがundefinedです');
    }

    const convertedChapterNum = convertStringToNumber(chapterNum);

    const arrayOfPartDTO = await partApplicationService.findByChapterNum(convertedChapterNum);

    return res.json(arrayOfPartDTO);
  })().catch(next);
});

export { partsRouter };
