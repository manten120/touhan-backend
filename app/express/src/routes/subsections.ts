/* eslint-disable no-unused-vars */
import express from 'express';
import { subsectionApplicationService } from '../application';
import { convertStringToNumber } from '../utility/functions/convertStringToNumber';
import type { CustomReq } from '../types';

const subsectionsRouter = express.Router();

subsectionsRouter.get('/all', (_req, res, next) => {
  (async () => {
    const arrayOfSubsectionDTO = await subsectionApplicationService.findAll();
    res.json(arrayOfSubsectionDTO);
  })().catch(next);
});

subsectionsRouter.get('/', (req: CustomReq, res, next) => {
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

    const arrayOfSubsectionDTO = await subsectionApplicationService.findBySection({
      chapterNumValue: convertedChapterNum,
      partNumValue: convertedPartNum,
      sectionNumValue: convertedSectionNum,
    });

    return res.json(arrayOfSubsectionDTO);
  })().catch(next);
});

export { subsectionsRouter };
