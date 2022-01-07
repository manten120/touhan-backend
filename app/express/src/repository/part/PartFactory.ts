import { Part } from '../../domain/models/part/Part';
import { ChapterNum } from '../../domain/models/chapter/ChapterNum';
import { PartNum } from '../../domain/models/part/PartNum';
import { PartTitle } from '../../domain/models/part/PartTitle';
import type { IPartFactory } from '../../domain/models/part/IPartFactory';

export class PartFactory implements IPartFactory {
  // eslint-disable-next-line class-methods-use-this
  create = (argObj: { chapterNumValue: number; partNumValue: number; partTitleValue: string }) => {
    const { chapterNumValue, partNumValue, partTitleValue } = argObj;

    const chapterNum = new ChapterNum(chapterNumValue);
    const partNum = new PartNum(partNumValue);
    const partTitle = new PartTitle(partTitleValue);
    const part = new Part({ chapterNum, partNum, partTitle });
    return part;
  };
}
