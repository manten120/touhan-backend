/* eslint-disable no-unused-vars */
import { Chapter } from './Chapter';

export interface IChapterFactory {
  create: (chapterNumValue: number, chapterTitleValue: string) => Chapter;
}
