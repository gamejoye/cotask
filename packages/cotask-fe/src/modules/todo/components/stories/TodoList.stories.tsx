import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import TodoList from '../TodoList';
import { FrequencyTypes } from '@cotask/types';

const meta: Meta<typeof TodoList> = {
  title: 'Modules/Todos/TodoList',
  component: TodoList,
  parameters: {
    layout: 'centered',
  },
  render: args => (
    <div style={{ width: 300 }}>
      <TodoList {...args} />
    </div>
  ),
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TodoList>;

export const Default: Story = {
  args: {
    todos: [
      {
        id: 1,
        title: 'Todo 1',
        completed: false,
        frequency: FrequencyTypes.NONE,
        dueDate: '2023-02-01',
        createAt: '2023-01-01',
      },
      {
        id: 2,
        title: 'Todo 2',
        completed: true,
        frequency: FrequencyTypes.NONE,
        dueDate: '2023-02-01',
        createAt: '2023-01-01',
      },
      {
        id: 3,
        title: 'Todo 3',
        completed: false,
        frequency: FrequencyTypes.NONE,
        dueDate: '2023-02-01',
        createAt: '2023-01-01',
      },
      {
        id: 4,
        title: 'Todo 4',
        completed: true,
        frequency: FrequencyTypes.NONE,
        dueDate: '2023-02-01',
        createAt: '2023-01-01',
      },
    ],
    title: '全部任务',
    onDelete: fn(),
    onComplete: fn(),
    onEdit: fn(),
    loadMore: fn(),
    hasMore: false,
    showCompleted: false,
  },
};

export const EmptyList: Story = {
  args: {
    todos: [],
    title: '今日任务',
    onDelete: fn(),
    onComplete: fn(),
    onEdit: fn(),
    loadMore: fn(),
    hasMore: false,
    showCompleted: false,
  },
};
