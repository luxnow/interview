import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from './Profile';

test('renders nick name', () => {
  render(
    <Profile
      nickname='mock_nickname'
      onHandleSignout={async () => { return }}
      onHandleUpdate={async () => { return }}
    />
  );
  const element = screen.getByText(/mock_nickname/i);
  expect(element).toBeInTheDocument();
});
