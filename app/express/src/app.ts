import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'reflect-metadata';

import { indexRouter } from './routes';
import { userRouter } from './routes/user';
import { manageChapterRouter } from './routes/manage/chapter';
import { manageTextRouter } from './routes/manage/text';
import { manageQuestionRouter } from './routes/manage/question';

import { notifyAdminOfError } from './adapter/notify';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ejsファイル内でbootstrapを "bootstrap/css/bootstrap.min.css" などのパスで読み込めるようにする
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')) as RequestHandler);

// ejsファイル内でbootstrapを "bootstrap/css/bootstrap.min.css" などのパスで読み込めるようにする
app.use('/scripts', express.static(path.join(__dirname, '../dist/scripts')) as RequestHandler);

app.use('/user', userRouter);
app.use('/manage/chapter', manageChapterRouter);
app.use('/manage/text', manageTextRouter);
app.use('/manage/question', manageQuestionRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, _res, next) => {
  next(createError(404, `存在しないパスへのリクエストです。\npath: ${req.path}`));
});

// error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  // _next は省略不可 error handler は4つの引数を受け取る必要がある
  res.status(err.status || 500); // 500 Internal Server Error

  try {
    // slackに通知
    notifyAdminOfError(err.stack);
  } catch (e) {
    console.error('エラーハンドラ内で管理者への通知に失敗しました', e);
  }

  if (!res.writableEnded) {
    res.send('なにかおかしいです');
  }
});

export { app };
