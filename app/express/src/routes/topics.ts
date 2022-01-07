/* eslint-disable no-unused-vars */
import express from 'express';
import { topicApplicationService } from '../application';
import { convertStringToNumber } from '../utility/functions/convertStringToNumber';
import type { CustomReq } from '../types';

const topicsRouter = express.Router();

topicsRouter.get('/all', (_req, res, next) => {
  (async () => {
    const arrayOfTopicDTO = await topicApplicationService.findAll();
    res.json(arrayOfTopicDTO);
  })().catch(next);
});

topicsRouter.get('/', (req: CustomReq, res, next) => {
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

    const arrayOfTopicDTO = await topicApplicationService.findBySubsection({
      chapterNumValue: convertedChapterNum,
      partNumValue: convertedPartNum,
      sectionNumValue: convertedSectionNum,
      subsectionNumValue: convertedSubsectionNum,
    });

    return res.json(arrayOfTopicDTO);
  })().catch(next);
});

export { topicsRouter };
