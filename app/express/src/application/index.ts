import { ChapterApplicationService } from './chapter/ChapterApplicationService';
import { ChapterRepository } from '../repository/chapter/ChapterRepository';
import { ChapterFactory } from '../repository/chapter/ChapterFactory';

import { PartApplicationService } from './part/PartApplicationService';
import { PartRepository } from '../repository/part/PartRepository';
import { PartFactory } from '../repository/part/PartFactory';

const chapterFactory = new ChapterFactory();
const chapterRepository = new ChapterRepository(chapterFactory);

export const chapterApplicationService = new ChapterApplicationService(chapterRepository, chapterFactory);

const partFactory = new PartFactory();
const partRepository = new PartRepository(partFactory);

export const partApplicationService = new PartApplicationService({ chapterRepository, partRepository, partFactory });
