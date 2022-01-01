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
};

export interface PostReq extends Request {
  body: Body;
}

export type Query = {
  id?: string;
};

export interface GetReq extends Request {
  query: Query;
}
