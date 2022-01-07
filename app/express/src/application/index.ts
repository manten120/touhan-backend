import { ChapterApplicationService } from './chapter/ChapterApplicationService';
import { ChapterRepository } from '../repository/chapter/ChapterRepository';
import { ChapterFactory } from '../repository/chapter/ChapterFactory';

import { PartApplicationService } from './part/PartApplicationService';
import { PartRepository } from '../repository/part/PartRepository';
import { PartFactory } from '../repository/part/PartFactory';

import { SectionApplicationService } from './section/sectionApplicationService';
import { SectionRepository } from '../repository/section/SectionRepositry';
import { SectionFactory } from '../repository/section/SectionFactory';

import { SubsectionApplicationService } from './subsection/SubsectionApplicationService';
import { SubsectionRepository } from '../repository/subsection/SubsectionRepository';
import { SubsectionFactory } from '../repository/subsection/SubsectionFactory';

const chapterFactory = new ChapterFactory();
const chapterRepository = new ChapterRepository(chapterFactory);

export const chapterApplicationService = new ChapterApplicationService(chapterRepository, chapterFactory);

const partFactory = new PartFactory();
const partRepository = new PartRepository(partFactory);

export const partApplicationService = new PartApplicationService({ chapterRepository, partRepository, partFactory });

const sectionFactory = new SectionFactory();
const sectionRepository = new SectionRepository(sectionFactory);

export const sectionApplicationService = new SectionApplicationService({
  chapterRepository,
  partRepository,
  sectionRepository,
  sectionFactory,
});

const subsectionFactory = new SubsectionFactory();
const subsectionRepository = new SubsectionRepository(subsectionFactory);

export const subsectionApplicationService = new SubsectionApplicationService({
  chapterRepository,
  partRepository,
  sectionRepository,
  subsectionRepository,
  subsectionFactory,
});
