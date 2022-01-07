import express from 'express';
import { getConnection } from 'typeorm';

import { UserORMEntity } from '../orm';
import type { CustomReq } from '../types';

const userRouter = express.Router();

userRouter.get('/', (req: CustomReq, res, next) => {
  (async () => {
    const { id } = req.query;

    if (!id) {
      return res.send('idを指定してください');
    }

    const userTable = getConnection().getRepository(UserORMEntity);
    const userData = await userTable.findOne({ where: { id } });

    const response = userData
      ? `id: ${id} のユーザーが見つかりました。 firstName: ${userData.first_name} lastName: ${userData.last_name}`
      : `id: ${id} のユーザーは存在しません`;

    return res.send(response);
  })().catch(next);
});

userRouter.post('/', (req: CustomReq, res, next) => {
  (async () => {
    const { firstName, lastName } = req.body;

    if (!firstName) {
      return res.send('firstNameを入力してください');
    }

    if (!lastName) {
      return res.send('lastNameを入力してください');
    }

    const userData = new UserORMEntity();
    userData.first_name = firstName;
    userData.last_name = lastName;

    const userTable = getConnection().getRepository(UserORMEntity);
    const savedUserData = await userTable.save(userData);

    const response = `ユーザーを登録しました。id: ${savedUserData.id} firstName: ${savedUserData.first_name} lastName: ${savedUserData.last_name}`;

    return res.send(response);
  })().catch(next);
});

export { userRouter };
