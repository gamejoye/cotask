import { fn } from '@storybook/test';

import CustomCheckbox from '../CustomCheckbox';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Shared/CubtomCheckbox',
  component: CustomCheckbox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
};

const Template = (args: any) => <CustomCheckbox {...args} />;

export const Default = Template.bind({});
(Default as any).args = {
  options: [
    {
      key: '1',
      label: '1',
      value: '1',
    },
    {
      key: '2',
      label: '2',
      value: '2',
    },
    {
      key: '3',
      label: '3',
      value: '3',
    },
    {
      key: '4',
      label: '4',
      value: '4',
    },
  ],
  onChange: fn(),
};
