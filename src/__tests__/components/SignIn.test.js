import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const signIn = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <SignInContainer signIn={signIn} />
      );

      fireEvent.changeText(getByPlaceholderText('Username'), 'kalle');
      fireEvent.changeText(getByPlaceholderText('Password'), 'password');
      fireEvent.press(getByText('Sign In'));

      await waitFor(() => {
        // expect the signIn function to have been called once and with a correct first argument
        expect(signIn).toHaveBeenCalledTimes(1);

        // signIn.mock.calls[0][0] contains the first argument of the first call
        expect(signIn.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});
