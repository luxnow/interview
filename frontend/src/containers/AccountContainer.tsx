import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Container, CssBaseline, Snackbar, Alert } from '@material-ui/core'
import * as model from '../models/account';
import SignupSignin from '../components/SignupSignin';
import Profile from '../components/Profile';

const defaultValue: {
  account?: model.Account;
  dispatch?: React.Dispatch<model.AccountAction>;
} = {};

const Context = React.createContext(defaultValue);

export default function AccountContainer(): React.ReactElement {
  const { intialValue } = model;
  const [status, setStatus] = useState(intialValue.status);
  const [isRunning, setRunning] = useState(intialValue.isRunning);
  const [account, dispatch] = useReducer(model.reducer, intialValue);

  useEffect(() => {
    if (account.status !== status) {
      setStatus(account.status);
    }
    if (account.isRunning !== isRunning) {
      setRunning(account.isRunning);
    }
  }, [account, status, isRunning]);

  const handleSignup = useCallback(async (nickname) => {
    model.signup(dispatch, nickname)
  }, [model, dispatch]);

  const handleSignin = useCallback(async (nickname) => {
    model.signin(dispatch, nickname)
  }, [model, dispatch]);

  const handleUpdate = useCallback(async (newNickname) => {
    model.updateAccount(dispatch, newNickname)
  }, [model, dispatch]);

  const handleSignout = useCallback(async () => {
    model.signout(dispatch)
  }, [model, dispatch]);

  const showSignUpIn = status === 'needAuthenticate';

  return (
    <Context.Provider value={{ account, dispatch }}>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          {
            showSignUpIn ?
              <SignupSignin
                nickname={account.nickname || ''}
                onHandleSignup={handleSignup}
                onHandleSignin={handleSignin}
              /> :
              <Profile
                nickname={account.nickname || ''}
                onHandleUpdate={handleUpdate}
                onHandleSignout={handleSignout}
              />
          }
          <Snackbar
            open={!!account.error}
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            onClose={() => dispatch({ type: 'clearError' })}
          >
            <Alert severity="warning" sx={{ width: '100%' }}>
              {account.error}
            </Alert>
          </Snackbar>
        </Container>
      </React.Fragment>
    </Context.Provider>
  )
}
