import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import CotaskDatePicker from '../CotaskDatePicker';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CotaskDatePicker> = {
  title: 'Shared/CotaskDatePicker',
  component: CotaskDatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CotaskDatePicker>;

export const Controlled: Story = {
  args: {
    onConfirm: fn(),
    frequency: 'DAILY',
    onChange: fn(),
  },
};

export const UnControlled: Story = {
  args: {
    onConfirm: fn(),
    initialFrequency: 'WEEKLY',
    onChange: fn(),
  },
};
