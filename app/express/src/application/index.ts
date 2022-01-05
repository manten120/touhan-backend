import { ChapterApplicationService } from './chapter/ChapterApplicationService';
import { ChapterRepository } from '../repository/chapter/ChapterRepository';
import { ChapterFactory } from '../repository/chapter/ChapterFactory';

const chapterFactory = new ChapterFactory();
const chapterRepository = new ChapterRepository(chapterFactory);

export const chapterApplicationService = new ChapterApplicationService(chapterRepository, chapterFactory);
