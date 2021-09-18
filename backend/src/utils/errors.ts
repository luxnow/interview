const DataBaseErrorCodes = {
  UNKNOWN: '0000',
  DUPLICATED: '0001',
  INVALID_KEY: '0002',
}

export class DataBaseError extends Error {
  code = DataBaseErrorCodes.UNKNOWN;
  static instanceOf(err: DataBaseError | Error | any): boolean {
    return err && typeof err.code === 'string' && Object.values(DataBaseErrorCodes).includes(err.code);
  }
}

export class DuplicatedError extends DataBaseError {
  code = DataBaseErrorCodes.DUPLICATED;
}

export class InvalidKeyError extends DataBaseError {
  code = DataBaseErrorCodes.INVALID_KEY;
}
