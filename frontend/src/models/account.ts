import React from 'react';
import * as services from '../services';

export interface Account {
  status: 'needAuthenticate' | 'authenticateSuccess';
  isRunning: boolean;
  nickname?: string;
  error?: string;
}

export type AccountAction = {
  type: 'signin';
  nickname: string;
  accessToken: string;
} | {
  type: 'update';
  nickname: string;
} | {
  type: 'signout';
} | {
  type: 'authenticateFail';
} | {
  type: 'running'
} | {
  type: 'error';
  message?: string;
} | {
  type: 'clearError';
}

const nickname = localStorage.getItem('account.nickname');

export const intialValue: Account = {
  status: 'needAuthenticate',
  isRunning: false,
  ...nickname ? { nickname } : {}
};

export function reducer(state: Account, action: AccountAction): Account {
  switch(action.type) {
    case 'signin': {
      const { nickname, accessToken } = action;

      localStorage.setItem('account.nickname', nickname);
      localStorage.setItem('account.accessToken', accessToken);
      return {
        ...state,
        isRunning: false,
        status: 'authenticateSuccess',
        nickname
      };
    }
    case 'signout': {
      const newState = { ...state };
      delete newState.nickname;
      return {
        ...newState,
        isRunning: false,
        status: 'needAuthenticate',
      };
    }
    case 'update': {
      const { nickname } = action;

      localStorage.setItem('account.nickname', nickname);
      return {
        ...state,
        nickname,
      };
    }
    case 'authenticateFail': {
      localStorage.removeItem('account.accessToken');
      return {
        ...state,
        isRunning: false,
        status: 'needAuthenticate',
      };
    }
    case 'running':
      return {
        ...state,
        isRunning: true,
      };
    case 'error':
      return {
        ...state,
        error: action.message,
      };
    case 'clearError':
      return {
        ...state,
        error: undefined,
      };
    default:
      return state;
  }
}

export async function signin(
  dispatch: React.Dispatch<AccountAction>,
  nickname: string
): Promise<void> {
  dispatch({ type: 'running' });

  const { hasError, errorDetails, accessToken } = await services.signinService({ nickname })

  if (hasError || !accessToken) {
    if (errorDetails) {
      dispatch({ type: 'error', message: errorDetails.message });
    }
    return dispatch({ type: 'authenticateFail' });
  }

  dispatch({ type: 'signin', nickname, accessToken });
}

export async function signup(
  dispatch: React.Dispatch<AccountAction>,
  nickname: string
): Promise<void> {
  dispatch({ type: 'running' });

  const { hasError, errorDetails, accessToken } = await services.signupService({ nickname })

  if (hasError || !accessToken) {
    if (errorDetails) {
      dispatch({ type: 'error', message: errorDetails.message });
    }
    return dispatch({ type: 'authenticateFail' });
  }

  dispatch({ type: 'signin', nickname, accessToken });
}

export async function updateAccount(
  dispatch: React.Dispatch<AccountAction>,
  newNickname: string
): Promise<void> {
  dispatch({ type: 'running' });

  const { hasError, errorDetails } = await services.updateSelfService({ nickname: newNickname });

  if (hasError) {
    if (errorDetails) {
      dispatch({ type: 'error', message: errorDetails.message });
    }
    return;
  }

  dispatch({ type: 'update', nickname: newNickname });
}

export async function signout(dispatch: React.Dispatch<AccountAction>): Promise<void> {
  dispatch({ type: 'running' });

  await services.signoutService({});

  dispatch({ type: 'signout' });
}
