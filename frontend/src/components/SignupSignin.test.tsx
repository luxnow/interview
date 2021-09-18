import React from 'react';
import { render, screen } from '@testing-library/react';
import SignupSignin from './SignupSignin';

test('renders nick name', () => {
  render(
    <SignupSignin
      nickname='mock_nickname'
      onHandleSignin={async () => { return }}
      onHandleSignup={async () => { return }}
    />
  );
  const element = screen.getByDisplayValue(/mock_nickname/i);
  expect(element).toBeInTheDocument();
});
