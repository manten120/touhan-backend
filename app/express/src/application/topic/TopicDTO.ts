import type { Topic } from "../../domain/models/topic/Topic";

export class TopicDTO {
  readonly chapterNum: number;

  readonly partNum: number;

  readonly sectionNum: number;

  readonly subsectionNum: number;

  readonly char: string;

  readonly title: string | null;

  constructor(topic: Topic) {
    this.chapterNum = topic.chapterNum.value;
    this.partNum = topic.partNum.value;
    this.sectionNum = topic.sectionNum.value;
    this.subsectionNum = topic.subsectionNum.value;
    this.char = topic.char.value;
    this.title = topic.title.value;
  }
}
