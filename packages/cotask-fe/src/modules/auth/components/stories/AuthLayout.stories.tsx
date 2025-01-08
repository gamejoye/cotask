import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import AuthLayout from '../AuthLayout';
import SignInForm from '../SignInForm';

type AuthLayoutPropsAndSignInFormArgs = React.ComponentProps<typeof AuthLayout> &
  React.ComponentProps<typeof SignInForm>;

const meta: Meta<AuthLayoutPropsAndSignInFormArgs> = {
  title: 'Modules/Auth/AuthLayout',
  component: AuthLayout,
  parameters: {
    layout: 'fullscreen',
  },
  render: ({ onFinish, ...rest }) => (
    <AuthLayout {...rest}>
      <SignInForm onFinish={onFinish} />
    </AuthLayout>
  ),
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<AuthLayoutPropsAndSignInFormArgs>;

export const Default: Story = {
  args: {
    onFinish: fn(),
  },
};
