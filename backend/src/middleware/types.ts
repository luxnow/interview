import * as auths from './auths';
import * as users from './users';

export type State = auths.AuthenticateState
& auths.TokenState
& users.CreateUserState
& users.RetrieveUserState
& users.UpdateUserState
& users.VerifyUserState
