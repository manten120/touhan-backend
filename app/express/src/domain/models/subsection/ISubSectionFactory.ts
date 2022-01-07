import type { Subsection } from './Subsection';

export interface ISubsectionFactory {
  create: (argsObj: {
    chapterNumValue: number;
    partNumValue: number;
    sectionNumValue: number;
    subsectionNumValue: number;
    subsectionTitleValue: string | null;
  }) => Subsection;
}
