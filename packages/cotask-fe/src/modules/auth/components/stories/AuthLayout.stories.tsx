import { fn } from '@storybook/test';

import AuthLayout, { Props } from '../AuthLayout';
import SignInForm from '../SignInForm';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Modules/Auth/AuthLayout',
  component: AuthLayout,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onFinish: fn() },
};

const Template = (args: Props) => (
  <AuthLayout {...args} >
    <SignInForm onFinish={fn()} />
  </AuthLayout>
);

export const Default = Template.bind({ onFinish: fn() });
