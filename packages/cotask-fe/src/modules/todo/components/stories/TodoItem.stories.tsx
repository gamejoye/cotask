import { fn } from '@storybook/test';

import TodoItem, { Props } from '../TodoItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Modules/Todos/TodoItem',
  component: TodoItem,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
};

const Template = (args: Props) => <TodoItem {...args} />;

export const Default = Template.bind({});
(Default as any).args = {
  todo: {
    id: 1,
    title: 'Learn React',
    completed: false,
  },
  onDelete: fn(),
  onComplete: fn(),
  onEdit: fn(),
  onCancel: fn(),
  initialIsEdting: false,
}

export const Editing = Template.bind({});
(Editing as any).args = {
  todo: {
    id: 1,
    title: 'Learn React',
    completed: false,
  },
  onDelete: fn(),
  onComplete: fn(),
  onEdit: fn(),
  onCancel: fn(),
  initialIsEdting: true,
}


