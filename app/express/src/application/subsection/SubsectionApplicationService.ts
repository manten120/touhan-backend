import type { IChapterRepository } from '../../domain/models/chapter/IChapterRepository';
import type { IPartRepository } from '../../domain/models/part/IPartRepository';
import type { ISectionRepository } from '../../domain/models/section/ISectionRepository';
import type { ISubsectionRepository } from '../../domain/models/subsection/ISubsectionRepository';
import type { ISubsectionFactory } from '../../domain/models/subsection/ISubSectionFactory';
import { ChapterNum } from '../../domain/models/chapter/ChapterNum';
import { PartNum } from '../../domain/models/part/PartNum';
import { SectionNum } from '../../domain/models/section/SectionNum';
import { SubsectionNum } from '../../domain/models/subsection/SubsectionNum';
import { SubsectionTitle } from '../../domain/models/subsection/SubsectionTitle';
import { SubsectionDTO } from './SubsectionDTO';

export class SubsectionApplicationService {
  private readonly chapterRepository: IChapterRepository;

  private readonly partRepository: IPartRepository;

  private readonly sectionRepository: ISectionRepository;

  private readonly subsectionRepository: ISubsectionRepository;

  private readonly subsectionFactory: ISubsectionFactory;

  constructor(argsObj: {
    chapterRepository: IChapterRepository;
    partRepository: IPartRepository;
    sectionRepository: ISectionRepository;
    subsectionRepository: ISubsectionRepository;
    subsectionFactory: ISubsectionFactory;
  }) {
    this.chapterRepository = argsObj.chapterRepository;
    this.partRepository = argsObj.partRepository;
    this.sectionRepository = argsObj.sectionRepository;
    this.subsectionRepository = argsObj.subsectionRepository;
    this.subsectionFactory = argsObj.subsectionFactory;
  }

  register = async (argsObj: {
    chapterNumValue: number;
    partNumValue: number;
    sectionNumValue: number;
    subsectionNumValue: number;
    subsectionTitleValue: string | null;
  }) => {
    const { chapterNumValue, partNumValue, sectionNumValue, subsectionNumValue, subsectionTitleValue } = argsObj;

    const chapterNum = new ChapterNum(chapterNumValue);

    const partNum = new PartNum(partNumValue);

    const sectionNum = new SectionNum(sectionNumValue);

    const chapterPromise = this.chapterRepository.findOne(chapterNum);

    const partPromise = this.partRepository.findOne(chapterNum, partNum);

    const sectionPromise = this.sectionRepository.findOne({ chapterNum, partNum, sectionNum });

    const [chapter, part, section] = await Promise.all([chapterPromise, partPromise, sectionPromise]);

    if (!chapter) {
      throw new Error('chapterNumに対応するchapterが存在しません');
    }

    if (!part) {
      throw new Error('chapterNumとpartNumValueに対応するpartが存在しません');
    }

    if (!section) {
      throw new Error('chapterNum, partNumValue, sectionNumに対応するsectionが存在しません');
    }

    const newSubsection = this.subsectionFactory.create({
      chapterNumValue,
      partNumValue,
      sectionNumValue,
      subsectionNumValue,
      subsectionTitleValue,
    });

    await this.subsectionRepository.save(newSubsection);
  };

  findOne = async (argsObj: {
    chapterNumValue: number;
    partNumValue: number;
    sectionNumValue: number;
    subsectionNumValue: number;
  }) => {
    const chapterNum = new ChapterNum(argsObj.chapterNumValue);
    const partNum = new PartNum(argsObj.partNumValue);
    const sectionNum = new SectionNum(argsObj.sectionNumValue);
    const subsectionNum = new SubsectionNum(argsObj.subsectionNumValue);

    const subsection = await this.subsectionRepository.findOne({ chapterNum, partNum, sectionNum, subsectionNum });

    if (!subsection) {
      return null;
    }

    const subsectionDTO = new SubsectionDTO(subsection);

    return subsectionDTO;
  };

  findAll = async () => {
    const subsections = await this.subsectionRepository.findAll();

    const arrayOfSubsectionDTO = subsections.map((subsection) => new SubsectionDTO(subsection));

    return arrayOfSubsectionDTO;
  };

  findBySection = async (argsObj: { chapterNumValue: number; partNumValue: number; sectionNumValue: number }) => {
    const chapterNum = new ChapterNum(argsObj.chapterNumValue);
    const partNum = new PartNum(argsObj.partNumValue);
    const sectionNum = new SectionNum(argsObj.sectionNumValue);

    const subsections = await this.subsectionRepository.findBySection({ chapterNum, partNum, sectionNum });

    const arrayOfSubsectionDTO = subsections.map((subsection) => new SubsectionDTO(subsection));

    return arrayOfSubsectionDTO;
  };

  update = async (argsObj: {
    chapterNumValue: number;
    partNumValue: number;
    sectionNumValue: number;
    subsectionNumValue: number;
    subsectionTitleValue: string | null;
  }) => {
    const chapterNum = new ChapterNum(argsObj.chapterNumValue);
    const partNum = new PartNum(argsObj.partNumValue);
    const sectionNum = new SectionNum(argsObj.sectionNumValue);
    const subsectionNum = new SubsectionNum(argsObj.subsectionNumValue);

    const subsection = await this.subsectionRepository.findOne({ chapterNum, partNum, sectionNum, subsectionNum });

    if (!subsection) {
      throw new Error(
        'chapterNumValue, partNumValue, sectionNumValue, subsectionNumに対応するsubsectionが存在しません'
      );
    }

    const newSubsectionTitle = new SubsectionTitle(argsObj.subsectionTitleValue);

    subsection.changeTitle(newSubsectionTitle);

    await this.subsectionRepository.save(subsection);
  };

  delete = async (argsObj: {
    chapterNumValue: number;
    partNumValue: number;
    sectionNumValue: number;
    subsectionNumValue: number;
  }) => {
    const chapterNum = new ChapterNum(argsObj.chapterNumValue);
    const partNum = new PartNum(argsObj.partNumValue);
    const sectionNum = new SectionNum(argsObj.sectionNumValue);
    const subsectionNum = new SubsectionNum(argsObj.subsectionNumValue);

    const subsection = await this.subsectionRepository.findOne({ chapterNum, partNum, sectionNum, subsectionNum });

    if (!subsection) {
      throw new Error(
        'chapterNumValue, partNumValue, sectionNumValue, subsectionNumValueに対応するsubsectionが存在しません'
      );
    }

    await this.subsectionRepository.delete(subsection);
  };
}
