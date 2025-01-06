import { fn } from '@storybook/test';

import TodoForm, { Props } from '../TodoForm';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Modules/Todos/TodoForm',
  component: TodoForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
};

const Template = (args: Props) => <TodoForm {...args} />;

export const Default = Template.bind({});
(Default as any).args = {
  todo: {
    id: 1,
    title: 'Todo 1',
    completed: false,
    priority: 'LOW',
    dueDate: '2023-02-01',
    frequency: 'NONE',
    createAt: '2023-01-01',
  },
  onEdit: fn(),
  onCancel: fn(),
}
