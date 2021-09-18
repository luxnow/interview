import { Handler } from '../utils/handler';

export type ErrorHandlerContext = {
  hasError?: boolean,
  errorDetails?: {
    status: string;
    message: string;
    err: Error;
  }
};

export const errorHandler: Handler<ErrorHandlerContext> = async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.hasError = true;
    console.error('[errorHandler]', err.status, err.message);

    if (!err) {
      return
    }

    ctx.errorDetails = {
      status: `${err.status}` || '500',
      message: err.message || 'unkown',
      err,
    }
    if (`${err.status}` === '401') {
      localStorage.removeItem('account.nickname');
      localStorage.removeItem('account.accessToken');

      location.href = '/'
    }
  }
}
