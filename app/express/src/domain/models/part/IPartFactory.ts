/* eslint-disable no-unused-vars */
import { Part } from './Part';

export interface IPartFactory {
  create: (argsObj: { chapterNumValue: number; partNumValue: number; partTitleValue: string }) => Part;
}
