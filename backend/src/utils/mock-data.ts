import { v4 as uuid } from 'uuid';
import _ from 'lodash';

export default class MockData<T extends { _id: string }> {
  namespace: string;
  dataMap: Map<string, T>;

  constructor(namespace: string) {
    this.namespace = namespace;
    this.dataMap = new Map();
  }

  async insert(insertObj: T): Promise<T> {
    const insertedItem: T = {
      ...insertObj,
      _id: uuid(),
    };

    this.dataMap.set(insertedItem._id, insertedItem);

    return insertedItem;
  }

  async update(_id: string, updateObject: Partial<T>): Promise<T | undefined> {
    const existingOne = this.dataMap.get(_id);

    if (existingOne) {
      const updatedItem = {
        ...existingOne,
        ..._.omit(updateObject, ['_id']),
      };

      this.dataMap.set(_id, updatedItem)

      return updatedItem;
    }

    return;
  }

  async delete(_id: string): Promise<void> {
    this.dataMap.delete(_id);
  }

  async findOne(_id: string): Promise<T | undefined> {
    return this.dataMap.get(_id);
  }
}
