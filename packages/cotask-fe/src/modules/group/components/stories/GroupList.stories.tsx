import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import GroupList from '../GroupList';
import { User } from '@cotask-fe/shared/models';
import { useState } from 'react';
import dayjs from 'dayjs';

const meta: Meta<typeof GroupList> = {
  title: 'Modules/Group/GroupList',
  component: GroupList,
  parameters: {
    layout: 'centered',
  },
  render: args => (
    <div style={{ width: 300 }}>
      <GroupList {...args} />
    </div>
  ),
  tags: ['autodocs'],
};

export default meta;

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

type Story = StoryObj<typeof GroupList>;

const createdBy: User = {
  id: 1,
  username: 'gamejoye',
  email: 'gamejoye@gmail.com',
  avatarUrl: '',
  createdAt: '',
  updatedAt: '',
};

const generateMockGroups = (start: number, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: start + i,
    name: `Group ${start + i}`,
    description: `Description for group ${start + i}`,
    createdBy: createdBy,
    createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }));
};

// TODO 虚拟列表

export const Default: Story = {
  args: {
    groups: [],
    onClick: fn(),
    loadMore: fn(),
    hasMore: false,
    container: '',
  },
  render: ({ onClick, loadMore }) => {
    const [groups, setGroups] = useState(() => generateMockGroups(0, 10));

    const handleLoadMore = async () => {
      // 模拟异步加载
      await sleep(1000);
      setGroups(prev => [...prev, ...generateMockGroups(prev.length, 10)]);
    };

    return (
      <div
        id='cotaskGroupList'
        style={{
          width: 300,
          height: 500,
          overflow: 'scroll',
          scrollbarWidth: 'none',
        }}
      >
        <GroupList
          groups={groups}
          onClick={onClick}
          loadMore={() => {
            loadMore();
            handleLoadMore();
          }}
          hasMore={groups.length < 50}
          container='cotaskGroupList'
        />
      </div>
    );
  },
};

export const Empty: Story = {
  args: {
    groups: [],
    onClick: fn(),
    loadMore: fn(),
    hasMore: false,
    container: '',
  },
};
