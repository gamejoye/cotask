import { fn } from '@storybook/test';

import TodoList, { Props } from '../TodoList';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Modules/Todos/TodoList',
  component: TodoList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
};

const Template = (args: Props) => <TodoList {...args} />;

export const Default = Template.bind({});
(Default as any).args = {
  todos: [
    {
      id: 1,
      title: 'Todo 1',
      completed: false,
    },
    {
      id: 2,
      title: 'Todo 2',
      completed: true,
    },
    {
      id: 3,
      title: 'Todo 3',
      completed: false,
    },
    {
      id: 4,
      title: 'Todo 4',
      completed: true,
    },
  ],
  group: {
    id: 1,
    name: '今天',
  },
  onDelete: fn(),
  onComplete: fn(),
  onEdit: fn(),
  loadMore: fn(),
  hasMore: false,
  showCompleted: false,
};

export const EmptyList = Template.bind({});
(EmptyList as any).args = {
  ...(Default as any).args,
  todos: [],
  showCompleted: false,
};
