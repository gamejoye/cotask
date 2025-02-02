import type { Meta, StoryObj } from '@storybook/react';

import CotaskLogo from '../CotaskLogo';

const meta: Meta<typeof CotaskLogo> = {
  title: 'Shared/CotaskLogo',
  component: CotaskLogo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CotaskLogo>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};
