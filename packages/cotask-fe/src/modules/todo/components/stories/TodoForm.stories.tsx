import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import TodoForm from '../TodoForm';
import { FrequencyTypes, PriorityTypes } from '@cotask/types';

const meta: Meta<typeof TodoForm> = {
  title: 'Modules/Todos/TodoForm',
  component: TodoForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TodoForm>;

export const Default: Story = {
  args: {
    todo: {
      id: 1,
      title: 'Todo 1',
      completed: false,
      priority: PriorityTypes.LOW,
      dueDate: '2023-02-01',
      frequency: FrequencyTypes.NONE,
      createAt: '2023-01-01',
    },
    onEdit: fn(),
  },
};
