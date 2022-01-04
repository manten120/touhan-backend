/* eslint-disable no-unused-vars */
import { Chapter } from './Chapter';
import type { ChapterNumValue, ChapterTitleValue } from '../../../types';

export interface IChapterFactory {
  create: (argsObj: { chapterNumValue: ChapterNumValue; chapterTitleValue: ChapterTitleValue }) => Chapter;
}
