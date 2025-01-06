import { List, Typography, Button, Flex } from 'antd';
import { useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import TodoItem from './TodoItem';
import { Group, Todo } from '@cotask/types';

export type Props = {
  todos: Todo[];
  group: Group;
  onDelete: (todo: Todo) => void;
  onComplete: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  loadMore: () => void;
  hasMore: boolean;
  showCompleted?: boolean;
};

type DataSource = { type: 'edit' | 'show'; todo: Todo }[];

export default function TodoList({
  todos,
  group,
  onDelete,
  onComplete,
  onEdit,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadMore,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasMore,
  showCompleted = false,
}: Props) {
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Todo | null>(null);
  const dataSource = useMemo(() => {
    const dataSource: DataSource = [];
    if (creating) {
      dataSource.push({
        type: 'edit',
        todo: { id: 0, title: '', completed: false, dueDate: '', createAt: '', frequency: 'NONE' },
      });
    }
    dataSource.push(
      ...(showCompleted ? todos : todos.filter(todo => !todo.completed)).map<DataSource[number]>(
        todo => ({
          type: editing?.id === todo.id ? 'edit' : 'show',
          todo,
        })
      )
    );
    return dataSource;
  }, [todos, showCompleted, creating, editing]);

  const handleNewTodo = () => {
    if (creating) return;
    if (editing) return;
    setCreating(true);
  };

  const handleDoubleClick = (todo: Todo) => {
    if (creating) return;
    if (editing) return;
    setEditing(todo);
  };

  const wrapperOnEdit: typeof onEdit = (...args) => {
    onEdit(...args);
    setEditing(null);
    setCreating(false);
  };
  return (
    <List
      dataSource={dataSource}
      style={{ minWidth: 300 }}
      locale={{
        emptyText: '已完成所有待办事项',
      }}
      header={
        <Flex justify='space-between'>
          <Typography.Title level={2} style={{ margin: 0 }}>
            {group.name}
          </Typography.Title>
          <Button
            type='dashed'
            icon={<PlusOutlined />}
            onClick={handleNewTodo}
            size='middle'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </Flex>
      }
      renderItem={({ type, todo }) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          initialIsEdting={type === 'edit'}
          onComplete={onComplete}
          onDelete={onDelete}
          onEdit={wrapperOnEdit}
          onCancel={
            creating
              ? () => {
                  setCreating(false);
                }
              : editing
                ? () => {
                    setEditing(null);
                  }
                : undefined
          }
          onDoubleClick={() => handleDoubleClick(todo)}
        />
      )}
    />
  );
}
