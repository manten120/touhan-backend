import type { Section } from "./Section";

export interface ISectionFactory {
  create: (argsObj: {chapterNumValue: number, partNumValue: number, sectionNumValue: number, sectionTitleValue: string | null}) => Section;
}