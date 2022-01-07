import express from 'express';
import { chapterApplicationService } from '../application';

const chaptersRouter = express.Router();

chaptersRouter.get('/all', (_req, res, next) => {
  (async () => {
    const arrayOfChapterDTO = await chapterApplicationService.findAll();
    res.json(arrayOfChapterDTO);
  })().catch(next);
});

export { chaptersRouter };
