/* eslint-disable no-unused-vars */
import express from 'express';
import { partApplicationService } from '../application';

const partsRouter = express.Router()

partsRouter.get('/all', (_req, res, next) => {
  (async () => {
    const arrayOfPartDTO = await partApplicationService.findAll();
    res.json(arrayOfPartDTO);
  })().catch(next);
});

export { partsRouter }
