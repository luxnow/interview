import { compose } from '../utils/handler';
import * as errors from './errors';
import * as auths from './auths';
import * as accounts from './accounts';

export const signupService = compose<errors.ErrorHandlerContext & auths.AuthenticateContext>(
  errors.errorHandler,
  auths.signup,
);

export const signinService = compose<errors.ErrorHandlerContext & auths.AuthenticateContext>(
  errors.errorHandler,
  auths.authenticate
);

export const signoutService = compose<errors.ErrorHandlerContext & auths.TokenContext>(
  errors.errorHandler,
  auths.signout,
);

export const updateSelfService = compose<errors.ErrorHandlerContext & accounts.AcountContext>(
  errors.errorHandler,
  auths.inspect,
  accounts.updateSelf,
);
