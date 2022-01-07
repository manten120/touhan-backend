import type { Part } from '../../domain/models/part/Part';

export class PartDTO {
  readonly chapterNum: number;

  readonly num: number;

  readonly title: string;

  constructor(part: Part) {
    this.chapterNum = part.chapterNum.value;
    this.num = part.num.value;
    this.title = part.title.value;
  }
}
