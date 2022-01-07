import type { Subsection } from "../../domain/models/subsection/Subsection";

export class SubsectionDTO {
  readonly chapterNum: number;

  readonly partNum: number;

  readonly sectionNum: number;

  readonly num: number;

  readonly title: string | null;

  constructor(subsection: Subsection) {
    this.chapterNum = subsection.chapterNum.value;
    this.partNum = subsection.partNum.value;
    this.sectionNum = subsection.sectionNum.value;
    this.num = subsection.num.value;
    this.title = subsection.title.value;
  }
}
