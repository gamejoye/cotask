import { fn } from '@storybook/test';

import CotaskDatePicker from '../CotaskDatePicker';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Shared/CotaskDatePicker',
  component: CotaskDatePicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
};

const Template = (args: any) => <CotaskDatePicker {...args} />;

export const Controlled = Template.bind({});
(Controlled as any).args = {
  onConfirm: fn(),
  frequency: 'DAILY',
  onChange: fn(),
}

export const UnControlled = Template.bind({});
(UnControlled as any).args = {
  onConfirm: fn(),
  initialFrequency: 'WEEKLY',
  onChange: fn(),
}


