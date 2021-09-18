import MockData from '../utils/mock-data';
import { DuplicatedError, InvalidKeyError } from '../utils/errors';

export type User = {
  _id: string;
  nickname: string;
}

class UserClass extends MockData<User> {
  indexes: Set<string>;
  constructor() {
    super('users')
    this.indexes = new Set<string>();
  }

  async insert(insertObj: User) {
    if (this.indexes.has(insertObj.nickname)) {
      throw new DuplicatedError('Duplicated value of nickname');
    }

    if (!insertObj.nickname) {
      throw new InvalidKeyError('nickname is required!')
    }

    const inserteditem = await super.insert(insertObj);

    this.indexes.add(insertObj.nickname);

    return inserteditem;
  }

  async update(_id: string, updateObj: Partial<User>) {
    if (Object.prototype.hasOwnProperty.call(updateObj, 'nickname') && !updateObj.nickname) {
      throw new InvalidKeyError('nickname is invalid');
    }

    const existingItem = await this.findOne(_id);

    if (!existingItem) {
      return;
    }

    if (updateObj.nickname && existingItem.nickname !== updateObj.nickname) {
      if (this.indexes.has(updateObj.nickname)) {
        throw new DuplicatedError('Duplicated value of nickname');
      }
      const updatedItem = await super.update(_id, updateObj);

      this.indexes.delete(existingItem.nickname);
      this.indexes.add(updateObj.nickname);

      return updatedItem;
    }

    return super.update(_id, updateObj);
  }

  async delete(_id: string) {
    const existingItem = await this.findOne(_id);

    if (!existingItem) {
      return;
    }

    await super.delete(_id);

    this.indexes.delete(existingItem.nickname);
  }

  async findOneByNickname(nickname: string) {
    if (!this.indexes.has(nickname)) {
      return;
    }

    const it = this.dataMap.values();

    do {
      const { done, value } = it.next();
      if (done) {
        break;
      }

      if (value.nickname === nickname) {
        return value;
      }
    } while(true);
  }
}

export default new UserClass()
