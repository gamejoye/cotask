import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import TodoForm from '../TodoForm';
import { FrequencyTypes, PriorityTypes } from '@cotask/types';
import { Todo } from '@cotask-fe/shared/models';

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
    initialTodo: {
      ...new Todo(),
      title: 'Uncontrolled Todo',
      description: 'This is an uncontrolled todo',
      priority: PriorityTypes.LOW,
      dueDate: '2023-03-01',
      frequency: FrequencyTypes.DAILY,
    },
    onEdit: fn(),
  },
};
