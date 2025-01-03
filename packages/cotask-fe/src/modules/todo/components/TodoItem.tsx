import { Button, Dropdown, Input, InputRef, Space, Tooltip, Typography } from "antd";
import { Todo } from "./TodoList";
import { MenuProps } from "antd/lib";
import { useEffect, useRef, useState } from "react";
import useToken from "antd/es/theme/useToken";
import { CheckOutlined, CloseOutlined, MenuOutlined } from "@ant-design/icons";

export type Props = {
  todo: Todo,
  initialIsEdting: boolean,
  onDelete: (todo: Todo) => void,
  onComplete: (todo: Todo) => void,
  onEdit: (todo: Todo) => void,
  onCancel?: () => void,
  onDoubleClick?: () => void
}

export default function TodoItem({
  todo,
  initialIsEdting,
  onComplete,
  onDelete,
  onEdit,
  onCancel,
  onDoubleClick
}: Props) {
  const [newTodo, setNewTodo] = useState<Todo>(todo);
  const editRef = useRef<InputRef>(null);
  const { colorTextLightSolid } = useToken()[1];

  useEffect(() => {
    if (editRef.current) editRef.current.focus();
  }, [editRef.current]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [newTodo]);
  const items: MenuProps['items'] = [
    {
      label: '优先级',
      key: '1',
      children: [
        {
          label: '低',
          key: '1/1',
        },
        {
          label: '中',
          key: '1/2',
        },
        {
          label: '高',
          key: '1/3',
        }
      ]
    },
  ];

  const onClick = () => {

  }

  const onTitleChange = (value: string) => {
    setNewTodo({ ...newTodo, title: value });
  }

  const handleCancel = () => {
    onCancel && onCancel();
  }

  const handleConfirm = () => {
    onEdit(newTodo);
  }
  // 编辑态
  if (initialIsEdting) {
    return (
      <div style={{
        border: '1px solid #d9d9d9',
        borderRadius: '4px',
        padding: '12px 16px',
        transition: 'border 0.2s ease-in-out',
        minWidth: 300,
      }}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Space style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
            <TodoRadio isNew={true} />
            <div style={{ flex: 1 }}>
              <Input
                value={newTodo.title}
                onChange={(e) => onTitleChange(e.target.value)}
                variant='borderless'
                ref={editRef}
                suffix={(
                  <Dropdown
                    menu={{ items, onClick }}
                    trigger={['click']}
                  >
                    <MenuOutlined />
                  </Dropdown>
                )}
              />
            </div>
          </Space>
          <Space style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
            <Tooltip color='cyan' title={(
              <>
                <Typography.Text keyboard style={{ color: colorTextLightSolid }}>esc</Typography.Text>
                退出编辑
              </>
            )}>
              <Button
                icon={<CloseOutlined />}
                type="default"
                onClick={handleCancel}
                size="small"
              />
            </Tooltip>

            <Button
              icon={<CheckOutlined />}
              type="primary"
              onClick={handleConfirm}
              size="small"
            />
          </Space>
        </Space>
      </div>
    )
  }

  // 常态
  return (
    <TodoItemRightClickMenu
      onComplete={() => onComplete(todo)}
      onDelete={() => onDelete(todo)}
      onEdit={() => onEdit(todo)}
    >
      <Space style={{ display: 'flex', width: '100%', alignItems: 'center', minWidth: 300 }}>
        <TodoRadio
          isNew={false}
          onClick={() => onComplete(todo)}
        />
        <div style={{ flex: 1 }} onDoubleClick={onDoubleClick}>
          <Typography.Text delete={todo.completed}>{todo.title}</Typography.Text>
          <div style={{ fontSize: '12px', color: '#999' }}>每日提醒 - {'2024/12/17'}</div>
        </div>
      </Space>
    </TodoItemRightClickMenu>
  )
}

function TodoRadio({ isNew, onClick }: { isNew: boolean, onClick?: () => void }) {
  return (
    <div
      onClick={() => onClick && onClick()}
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        border: isNew ? '2px dashed #1890ff' : '2px solid #1890ff',
        cursor: isNew ? undefined : 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '16px',
      }}
    />
  )
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
      <div style={{
        border: isOpen ? '1px solid #1890ff' : '1px solid #d9d9d9',
        borderRadius: '4px',
        padding: '12px 16px',
        transition: 'border 0.2s ease-in-out',
        boxShadow: isOpen ? '0 0 8px rgba(24, 144, 255, 0.5)' : 'none',
      }}>
        {children}
      </div>
    </Dropdown>
  );
};