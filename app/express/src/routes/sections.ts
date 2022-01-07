/* eslint-disable no-unused-vars */
import express from 'express';
import { sectionApplicationService } from '../application';
import { convertStringToNumber } from '../utility/functions/convertStringToNumber';
import type { CustomReq } from '../types';

const sectionsRouter = express.Router();

sectionsRouter.get('/all', (_req, res, next) => {
  (async () => {
    const arrayOfSectionDTO = await sectionApplicationService.findAll();
    res.json(arrayOfSectionDTO);
  })().catch(next);
});

sectionsRouter.get('/', (req: CustomReq, res, next) => {
  (async () => {
    const { chapterNum, partNum } = req.query;

    if (chapterNum === undefined) {
      res.status(400);
      return res.send('chapterNumがundefinedです');
    }

    if (partNum === undefined) {
      res.status(400);
      return res.send('partNumがundefinedです');
    }

    const convertedChapterNum = convertStringToNumber(chapterNum);
    const convertedPartNum = convertStringToNumber(partNum);

    const arrayOfSectionDTO = await sectionApplicationService.findByPart(convertedChapterNum, convertedPartNum);

    return res.json(arrayOfSectionDTO);
  })().catch(next);
});

export { sectionsRouter };
