import type { IChapterRepository } from '../../domain/models/chapter/IChapterRepository';
import type { IPartRepository } from '../../domain/models/part/IPartRepository';
import type { ISectionRepository } from '../../domain/models/section/ISectionRepository';
import type { ISectionFactory } from '../../domain/models/section/ISectionFactory';
import { ChapterNum } from '../../domain/models/chapter/ChapterNum';
import { PartNum } from '../../domain/models/part/PartNum';
import { SectionNum } from '../../domain/models/section/SectionNum';
import { SectionDTO } from './SectionDTO';
import { SectionTitle } from '../../domain/models/section/SectionTitle';

export class SectionApplicationService {
  private readonly chapterRepository: IChapterRepository;

  private readonly partRepository: IPartRepository;

  private readonly sectionRepository: ISectionRepository;

  private readonly sectionFactory: ISectionFactory;

  constructor(argsObj: {
    chapterRepository: IChapterRepository;
    partRepository: IPartRepository;
    sectionRepository: ISectionRepository;
    sectionFactory: ISectionFactory;
  }) {
    this.chapterRepository = argsObj.chapterRepository;
    this.partRepository = argsObj.partRepository;
    this.sectionRepository = argsObj.sectionRepository;
    this.sectionFactory = argsObj.sectionFactory;
  }

  register = async (argsObj: {
    chapterNumValue: number;
    partNumValue: number;
    sectionNumValue: number;
    sectionTitleValue: string | null;
  }) => {
    const { chapterNumValue, partNumValue, sectionNumValue, sectionTitleValue } = argsObj;

    const chapterNum = new ChapterNum(chapterNumValue);

    const partNum = new PartNum(partNumValue);

    const chapterPromise = this.chapterRepository.findOne(chapterNum);

    const partPromise = await this.partRepository.findOne(chapterNum, partNum);

    const [chapter, part] = await Promise.all([chapterPromise, partPromise]);

    if (!chapter) {
      throw new Error('chapterNumに対応するchapterが存在しません');
    }

    if (!part) {
      throw new Error('chapterNumとpartNumValueに対応するpartが存在しません');
    }

    const newSection = this.sectionFactory.create({
      chapterNumValue,
      partNumValue,
      sectionNumValue,
      sectionTitleValue,
    });

    await this.sectionRepository.save(newSection);
  };

  findOne = async (argsObj: { chapterNumValue: number; partNumValue: number; sectionNumValue: number }) => {
    const chapterNum = new ChapterNum(argsObj.chapterNumValue);
    const partNum = new PartNum(argsObj.partNumValue);
    const sectionNum = new SectionNum(argsObj.sectionNumValue);

    const section = await this.sectionRepository.findOne({ chapterNum, partNum, sectionNum });

    if (!section) {
      return null;
    }

    const sectionDTO = new SectionDTO(section);

    return sectionDTO;
  };

  findAll = async () => {
    const sections = await this.sectionRepository.findAll();

    const arrayOfSectionDTO = sections.map((section) => new SectionDTO(section));

    return arrayOfSectionDTO;
  };

  findByPart = async (chapterNumValue: number, partNumValue: number) => {
    const chapterNum = new ChapterNum(chapterNumValue);
    const partNum = new PartNum(partNumValue);

    const sections = await this.sectionRepository.findByPart(chapterNum, partNum);

    const arrayOfSectionDTO = sections.map((section) => new SectionDTO(section));

    return arrayOfSectionDTO;
  };

  update = async (argsObj: {
    chapterNumValue: number;
    partNumValue: number;
    sectionNumValue: number;
    sectionTitleValue: string | null;
  }) => {
    const { chapterNumValue, partNumValue, sectionNumValue, sectionTitleValue } = argsObj;

    const chapterNum = new ChapterNum(chapterNumValue);
    const partNum = new PartNum(partNumValue);
    const sectionNum = new SectionNum(sectionNumValue);
    const section = await this.sectionRepository.findOne({ chapterNum, partNum, sectionNum });

    if (!section) {
      throw new Error('chapterNumValue, partNumValue, sectionNumValueに対応するsectionが存在しません');
    }

    const newSectionTitle = new SectionTitle(sectionTitleValue);

    section.changeTitle(newSectionTitle);

    await this.sectionRepository.save(section);
  };

  delete = async (argsObj: { chapterNumValue: number; partNumValue: number; sectionNumValue: number }) => {
    const { chapterNumValue, partNumValue, sectionNumValue } = argsObj;

    const chapterNum = new ChapterNum(chapterNumValue);
    const partNum = new PartNum(partNumValue);
    const sectionNum = new SectionNum(sectionNumValue);

    const section = await this.sectionRepository.findOne({ chapterNum, partNum, sectionNum });

    if (!section) {
      throw new Error('chapterNumValue, partNumValue, sectionNumValueに対応するsectionが存在しません');
    }

    await this.sectionRepository.delete(section);
  };
}
