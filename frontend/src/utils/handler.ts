export type NextFunc<TError extends Error = Error> = (err?: TError) => Promise<void>;

export type Handler<T> = (ctx: T, next: NextFunc) => Promise<void>;

export type ComposedHandler<T> = (ctx: T) => Promise<T>;

export function compose<T>(...handlers: Handler<T>[]): ComposedHandler<T> {
  return async (ctx) => {
    const it: Iterator<Handler<T>, Handler<T>> = handlers.values();
    let currIndex = 0;

    const interNext = async function (index: number, err?: Error) {
      if (currIndex !== index) {
        throw new Error('Duplicated calling next!');
      }

      if (err) {
        throw err;
      }

      const { done, value } = it.next();

      if (!done) {
        currIndex += 1;
        const nextIndex = currIndex;
        const next = async (err?: Error) => interNext(nextIndex, err);

        await value(ctx, next);
      }
    }

    await interNext(0);

    return ctx;
  }
}
