import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import GroupList from '../GroupList';
import { User } from '@cotask/types';

const meta: Meta<typeof GroupList> = {
  title: 'Modules/Group/GroupList',
  component: GroupList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GroupList>;

const createdBy: User = {
  id: 1,
  username: 'gamejoye',
  email: 'gamejoye@gmail.com',
  avatarUrl: '',
  createdAt: '',
  updatedAt: '',
};

export const Default: Story = {
  args: {
    groups: [
      {
        id: 1,
        name: 'ACM集训营',
        description: '2025ACM寒假集训营',
        createdBy: createdBy,
        createdAt: '2025-01-10 19:42:56',
        updatedAt: '2025-01-10 20:14:12',
      },
      {
        id: 2,
        name: 'React Learner',
        description: '学习React原理',
        createdBy: createdBy,
        createdAt: '2025-01-11 19:42:56',
        updatedAt: '2025-01-11 20:14:12',
      },
      {
        id: 1,
        name: 'Cotask Work Group',
        description: 'Cotask工作组',
        createdBy: createdBy,
        createdAt: '2025-01-12 19:42:56',
        updatedAt: '2025-01-12 20:14:12',
      },
    ],
    loading: false,
    error: '',
    onClick: fn(),
    loadMore: fn(),
    hasMore: false,
  },
};

export const Empty: Story = {
  args: {
    groups: [],
    loading: false,
    error: '',
    onClick: fn(),
    loadMore: fn(),
    hasMore: false,
  },
};

export const Error: Story = {
  args: {
    groups: [],
    loading: false,
    error: '网络波动，请检查网络情况',
    onClick: fn(),
    loadMore: fn(),
    hasMore: false,
    retry: fn(),
  },
};
