import type { Meta, StoryObj } from '@storybook/react';

import CotaskCard from '../CotaskCard';
import { fn } from '@storybook/test';

const meta: Meta<typeof CotaskCard> = {
  title: 'Shared/CotaskCard',
  component: CotaskCard,
  parameters: {
    layout: 'centered',
  },
  render: args => {
    return (
      <div style={{ width: 200 }}>
        <CotaskCard {...args} />
      </div>
    );
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CotaskCard>;

export const Default: Story = {
  args: {
    title: '我的',
    content: '3项待完成',
    onClick: fn(),
  },
};

export const Active: Story = {
  args: {
    title: '全部',
    content: '12项待完成',
    active: true,
    onClick: fn(),
  },
};
