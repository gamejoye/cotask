import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import GroupForm from '../GroupForm';
import { Group } from '@cotask-fe/shared/models';

const meta: Meta<typeof GroupForm> = {
  title: 'Modules/Group/GroupForm',
  component: GroupForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: args => (
    <div style={{ width: 300 }}>
      <GroupForm {...args} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof GroupForm>;

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
};

export const WithInitialValues: Story = {
  args: {
    group: {
      ...new Group(),
      name: 'ACMER',
      description: 'ACMER 是一个 ACMER 的群组',
    },
    onSubmit: fn(),
  },
};
