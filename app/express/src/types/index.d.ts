import { Request } from 'express';

export type Body = {
  firstName?: string;
  lastName?: string;
  chapterNum?: number;
  chapterTitle?: string;
  partNum?: number;
  partTitle?: string;
  sectionNum?: number;
  sectionTitle?: string | null;
  subsectionNum?: number;
  subsectionTitle?:  string | null;
  topicChar?: string;
  topicTitle?: string | null;
  line?: number;
  textNum?: number;
  textBody?: string;
  productId?: number;
};

export type Query = {
  id?: string;
  textId?: string;
  chapterNum?: string;
  partNum?: string;
  sectionNum?: string;
  subsectionNum?: string;
  topicChar?: string;
};

export interface CustomReq extends Request {
  query: Query;
  body: Body;
}
