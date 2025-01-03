import { List, Space, Typography, Dropdown } from 'antd';
import { useMemo, useState } from 'react';
import type { MenuProps } from 'antd';
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

export type Props = {
  todos: Todo[]
  onDelete: (todo: Todo) => void,
  onComplete: (todo: Todo) => void
  onEdit: (todo: Todo) => void,
  loadMore: () => void,
  hasMore: boolean,
  showCompleted?: boolean
}

export default function TodoList({
  todos,
  onDelete,
  onComplete,
  onEdit,
  loadMore,
  hasMore,
  showCompleted = false,
}: Props) {
  const dataSource = useMemo(() => {
    return showCompleted ? todos : todos.filter((todo) => !todo.completed);
  }, [todos, showCompleted]);
  return (
    <List
      dataSource={dataSource}
      style={{ minWidth: 300 }}
      locale={{
        emptyText: '已完成所有待办事项',
      }}
      renderItem={(todo) => (
        <TodoItemRightClickMenu
          onComplete={() => onComplete(todo)}
          onDelete={() => onDelete(todo)}
          onEdit={() => onEdit(todo)}
        >
          <Space style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
            <div
              onClick={() => onComplete(todo)}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '2px solid #1890ff',
                backgroundColor: todo.completed ? '#1890ff' : undefined,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '16px',
              }}
            />
            <div style={{ flex: 1 }}>
              <Typography.Text delete={todo.completed}>{todo.title}</Typography.Text>
              <div style={{ fontSize: '12px', color: '#999' }}>每日提醒 - {'2024/12/17'}</div>
            </div>
          </Space>
        </TodoItemRightClickMenu>
      )}
    />
  );
}

type RightClickMenuProps = {
  children: React.ReactNode,
  onDelete: () => void,
  onComplete: () => void,
  onEdit: () => void,
}

function TodoItemRightClickMenu({ children, onDelete, onComplete, onEdit }: RightClickMenuProps) {
  const items: MenuProps['items'] = [
    {
      label: '标记为完成',
      key: '1',
    },
    {
      label: '优先级',
      key: '2',
      children: [
        {
          label: '低',
          key: '2/1',
        },
        {
          label: '中',
          key: '2/2',
        },
        {
          label: '高',
          key: '2/3',
        }
      ]
    },
    {
      label: '删除',
      key: '3',
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      onComplete();
    } else if (key === '2') {

    } else if (key === '3') {
      onDelete();
    }
  };

  return (
    <Dropdown
      menu={{ items, onClick }}
      trigger={['contextMenu']} onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
      }}
    >
      <List.Item style={{
        border: isOpen ? '1px solid #1890ff' : '1px solid #d9d9d9',
        borderRadius: '4px',
        padding: '12px 16px',
        transition: 'border 0.2s ease-in-out',
        boxShadow: isOpen ? '0 0 8px rgba(24, 144, 255, 0.5)' : 'none',
      }}>
        {children}
      </List.Item>
    </Dropdown>
  );
};