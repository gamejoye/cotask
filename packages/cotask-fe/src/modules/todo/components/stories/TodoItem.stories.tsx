import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import TodoItem from '../TodoItem';
import { FrequencyTypes } from '@cotask/types';

const meta: Meta<typeof TodoItem> = {
  title: 'Modules/Todos/TodoItem',
  component: TodoItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TodoItem>;

export const Default: Story = {
  args: {
    todo: {
      id: 1,
      title: 'Learn React',
      completed: false,
      frequency: FrequencyTypes.NONE,
      dueDate: '2023-02-01',
      createAt: '2023-01-01',
    },
    onDelete: fn(),
    onComplete: fn(),
    onEdit: fn(),
    onCancel: fn(),
    initialIsEdting: false,
  },
};

export const Editing: Story = {
  args: {
    todo: {
      id: 1,
      title: 'Learn React',
      completed: false,
      frequency: FrequencyTypes.NONE,
      dueDate: '2023-02-01',
      createAt: '2023-01-01',
    },
    onDelete: fn(),
    onComplete: fn(),
    onEdit: fn(),
    onCancel: fn(),
    initialIsEdting: true,
  },
};
