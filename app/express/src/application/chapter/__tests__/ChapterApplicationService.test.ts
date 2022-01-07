import { InMemoryChapterRepository } from '../../../repository/chapter/InMemoryChapterRepository';
import { ChapterFactory } from '../../../repository/chapter/ChapterFactory';
import { ChapterApplicationService } from '../ChapterApplicationService';
import { ChapterNum } from '../../../domain/models/chapter/ChapterNum';

const chapterFactory = new ChapterFactory();
const inMemoryChapterRepository = new InMemoryChapterRepository(chapterFactory);
const chapterApplicationService = new ChapterApplicationService(inMemoryChapterRepository, chapterFactory);

describe('chapterApplicationService', () => {
  const chapterNumValue1 = 1;
  const chapterTitleValue1 = '第1章のタイトル';

  const chapterNumValue2 = 2;
  const chapterTitleValue2 = '第2章のタイトル';

  beforeEach(() => {
    const chapter1 = chapterFactory.create(chapterNumValue1, chapterTitleValue1);
    inMemoryChapterRepository.store.set(JSON.stringify(chapter1.num), chapter1);

    const chapter2 = chapterFactory.create(chapterNumValue2, chapterTitleValue2);
    inMemoryChapterRepository.store.set(JSON.stringify(chapter2.num), chapter2);
  });

  afterEach(() => {
    inMemoryChapterRepository.store.clear();
  });

  it('.register()', async () => {
    const chapterNumValue3 = 3;
    const chapterTitleValue3 = '第3章のタイトル';

    await chapterApplicationService.register(chapterNumValue3, chapterTitleValue3);

    const chapterNameOfRegisteredChapter = new ChapterNum(chapterNumValue3);

    const registeredChapter = await inMemoryChapterRepository.findOne(chapterNameOfRegisteredChapter);

    expect.assertions(3);
    expect(registeredChapter).not.toBeNull();
    expect(registeredChapter!.num.value).toBe(chapterNumValue3);
    expect(registeredChapter!.title.value).toBe(chapterTitleValue3);
  });

  it('.register() 重複している場合エラー', () => {
    expect(() => chapterApplicationService.register(chapterNumValue1, '適当なタイトル')).rejects.toThrow();
  });

  it('.find()', async () => {
    const chapterNum1 = new ChapterNum(chapterNumValue1);
    const storedChapter = await inMemoryChapterRepository.findOne(chapterNum1);

    expect.assertions(3);
    expect(storedChapter).not.toBeNull();
    expect(storedChapter!.num.value).toBe(chapterNumValue1);
    expect(storedChapter!.title.value).toBe(chapterTitleValue1);
  });

  it('.findAll()', async () => {
    const result = await chapterApplicationService.findAll();
    const storedChapter1 = result[0];
    const storedChapter2 = result[1];

    expect.assertions(4);
    expect(storedChapter1.num).toBe(chapterNumValue1);
    expect(storedChapter1.title).toBe(chapterTitleValue1);

    expect(storedChapter2.num).toBe(chapterNumValue2);
    expect(storedChapter2.title).toBe(chapterTitleValue2);
  });

  it('.update()', async () => {
    const chapterTitleValue1After = '第1章の変更後のタイトル';
    await chapterApplicationService.update(chapterNumValue1, chapterTitleValue1After);
    const updatedChapter1 = await chapterApplicationService.findOne(chapterNumValue1);

    expect.assertions(1);
    expect(updatedChapter1?.title).toBe(chapterTitleValue1After);
  });

  it('.update() 未登録の場合エラー', async () => {
    const chapterNumValue3 = 3;
    const chapterTitleValue3After = '第3章の変更後のタイトル';

    expect.assertions(1);
    expect(() => chapterApplicationService.update(chapterNumValue3, chapterTitleValue3After)).rejects.toThrow();
  });

  it('.delete()', async () => {
    expect.assertions(2);

    const chapterNum1 = new ChapterNum(chapterNumValue1);
    const storedChapter = await inMemoryChapterRepository.findOne(chapterNum1);
    expect(storedChapter).not.toBeNull();

    await chapterApplicationService.delete(chapterNumValue1);

    const result = await inMemoryChapterRepository.findOne(chapterNum1);
    expect(result).toBeNull();
  });
});
