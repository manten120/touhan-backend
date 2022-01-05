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
  textBody?: string;
  productId?: number;
};

export type Query = {
  id?: string;
  textId?: string;
  chapterNum?: string;
};

export interface CustomReq extends Request {
  query: Query;
  body: Body;
}
