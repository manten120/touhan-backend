import type { IChapterRepository } from '../../domain/models/chapter/IChapterRepository';
import type { IPartRepository } from '../../domain/models/part/IPartRepository';
import type { IPartFactory } from '../../domain/models/part/IPartFactory';
import { PartNum } from '../../domain/models/part/PartNum';
import { PartTitle } from '../../domain/models/part/PartTitle';
import { PartDTO } from './PartDTO';
import { ChapterNum } from '../../domain/models/chapter/ChapterNum';

export class PartApplicationService {
  private readonly chapterRepository: IChapterRepository;

  private readonly partRepository: IPartRepository;

  private readonly partFactory: IPartFactory;

  constructor(argsObj: {
    chapterRepository: IChapterRepository;
    partRepository: IPartRepository;
    partFactory: IPartFactory;
  }) {
    this.chapterRepository = argsObj.chapterRepository;
    this.partRepository = argsObj.partRepository;
    this.partFactory = argsObj.partFactory;
  }

  register = async (argsObj: { chapterNumValue: number; partNumValue: number; partTitleValue: string }) => {
    const { chapterNumValue, partNumValue, partTitleValue } = argsObj;

    const chapterNum = new ChapterNum(chapterNumValue);

    const partNum = new PartNum(partNumValue);

    const chapterPromise = this.chapterRepository.findOne(chapterNum);

    const partPromise = await this.partRepository.find(chapterNum, partNum);

    const [chapter, part] = await Promise.all([chapterPromise, partPromise]);

    if (!chapter) {
      throw new Error('chapterNumに対応するchapterが存在しません');
    }

    if (part) {
      throw new Error('chapterNumとpartNumValueに対応するpartが既に存在しています');
    }

    const newPart = this.partFactory.create({ chapterNumValue, partNumValue, partTitleValue });

    await this.partRepository.save(newPart);
  };

  find = async (chapterNumValue: number, partNumValue: number) => {
    const chapterNum = new ChapterNum(chapterNumValue);
    const partNum = new PartNum(partNumValue);

    const part = await this.partRepository.find(chapterNum, partNum);

    if (!part) {
      throw new Error('partNumValueに対応するpartが存在しません');
    }

    const partDTO = new PartDTO(part);

    return partDTO;
  };

  findAll = async () => {
    const parts = await this.partRepository.findAll();

    const arrayOfPartDTO = parts.map((part) => new PartDTO(part));

    return arrayOfPartDTO;
  };

  update = async (argsObj: { chapterNumValue: number; partNumValue: number; partTitleValue: string }) => {
    const { chapterNumValue, partNumValue, partTitleValue } = argsObj;

    const chapterNum = new ChapterNum(chapterNumValue);
    const partNum = new PartNum(partNumValue);
    const part = await this.partRepository.find(chapterNum, partNum);

    if (!part) {
      throw new Error('partNumValueに対応するpartが存在しません');
    }

    const newPartTitle = new PartTitle(partTitleValue);

    part.changeTitle(newPartTitle);

    await this.partRepository.save(part);
  };

  delete = async (chapterNumValue: number, partNumValue: number) => {
    const chapterNum = new ChapterNum(chapterNumValue);
    const partNum = new PartNum(partNumValue);
    const part = await this.partRepository.find(chapterNum, partNum);

    if (!part) {
      throw new Error('partNumValueに対応するpartは存在しません');
    }

    await this.partRepository.delete(part);
  };
}
