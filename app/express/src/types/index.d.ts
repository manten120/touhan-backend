import { Request } from 'express';

export type Body = {
  firstName?: string;
  lastName?: string;
  chapterNum?: number;
  chapterTitle?: string;
  partNum?: number;
  partTitle?: string;
  sectionNum?: number;
  sectionTitle?: string;
  subsectionNum?: number;
  subsectionTitle?: string;
  topicChar?: string;
  topicTitle?: string;
  line?: number;
  textNum?: number;
  text?: string;
  productId?: number;
};

export interface PostReq extends Request {
  body: Body;
}

export type Query = {
  id?: string;
  textId?: string;
};

export interface GetReq extends Request {
  query: Query;
}

export type ChapterNumValue = 1 | 2 | 3 | 4 | 5;

export type ChapterTitleValue =
  | '医薬品に共通する特性と基本的な知識'
  | '人体の働きと医薬品'
  | '主な医薬品とその作用'
  | '薬事関係法規・制度'
  | '医薬品の適正使用・安全対策';

export type PairOfChapterNumAndTitle = {
  readonly chapterNumValue: ChapterNumValue;
  readonly chapterTitleValue: ChapterTitleValue;
};
