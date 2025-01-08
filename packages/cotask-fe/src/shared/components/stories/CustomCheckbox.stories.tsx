import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import CustomCheckbox from '../CustomCheckbox';

const meta: Meta<typeof CustomCheckbox> = {
  title: 'Shared/CubtomCheckbox',
  component: CustomCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CustomCheckbox>;

export const Default: Story = {
  args: {
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
  },
};
