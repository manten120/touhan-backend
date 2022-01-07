import type { Section } from '../../domain/models/section/Section';

export class SectionDTO {
  readonly chapterNum: number;

  readonly partNum: number;

  readonly num: number;

  readonly title: string | null;

  constructor(section: Section) {
    this.chapterNum = section.chapterNum.value;
    this.partNum = section.partNum.value;
    this.num = section.num.value;
    this.title = section.title.value;
  }
}
