import type { Chapter } from '../../domain/models/chapter/Chapter';

export class ChapterData {
  readonly num: number;

  readonly title: string;

  constructor(chapter: Chapter) {
    this.num = chapter.num.value;
    this.title = chapter.title.value;
  }
}
