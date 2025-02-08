import { Button, Dropdown, Input, InputRef, Modal, Space, Tooltip, Typography } from 'antd';
import { MenuProps } from 'antd/lib';
import { useEffect, useRef, useState } from 'react';
import useToken from 'antd/es/theme/useToken';
import { CheckOutlined, CloseOutlined, MenuOutlined } from '@ant-design/icons';
import TodoForm from './TodoForm';
import { Todo } from '@cotask-fe/shared/models';

export type Props = {
  todo: Todo;
  initialIsEdting: boolean;
  onDelete: (todo: Todo) => void;
  onComplete: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onCancel?: () => void;
  onDoubleClick?: () => void;
};

export default function TodoItem({
  todo,
  initialIsEdting,
  onComplete,
  onDelete,
  onEdit,
  onCancel,
  onDoubleClick,
}: Props) {
  const [newTodo, setNewTodo] = useState<Todo>(todo);
  const editRef = useRef<InputRef>(null);
  const { colorTextLightSolid } = useToken()[1];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (editRef.current) editRef.current.focus();
  }, []);

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

  const onTitleChange = (value: string) => {
    setNewTodo({ ...newTodo, title: value });
  };

  const onDescriptionChange = (value: string) => {
    setNewTodo({ ...newTodo, description: value });
  };

  const handleCancel = () => {
    onCancel && onCancel();
  };

  const handleConfirm = () => {
    if (newTodo.title.trim() === '') {
      onCancel && onCancel();
      return;
    }
    onEdit(newTodo);
  };
  // 编辑态
  if (initialIsEdting) {
    return (
      <>
        <div
          style={{
            boxSizing: 'border-box',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            padding: '12px 16px',
            width: '100%',
            marginTop: '10px',
          }}
        >
          <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
            <div style={{ display: 'flex', width: '100%' }}>
              <TodoRadio isNew={true} />
              <div style={{ flex: 1 }}>
                <Input
                  value={newTodo.title}
                  onChange={e => onTitleChange(e.target.value)}
                  variant='borderless'
                  style={{ paddingLeft: 0 }}
                  ref={editRef}
                  suffix={<MenuOutlined onClick={showModal} />}
                />
                <Input.TextArea
                  placeholder='待办事项描述'
                  value={newTodo.description}
                  onChange={e => onDescriptionChange(e.target.value)}
                  variant='borderless'
                  style={{ paddingLeft: 0, color: '#999' }}
                  rows={1}
                  autoSize={{ maxRows: 10 }}
                />
                <div style={{ fontSize: '12px', color: '#999' }}>每日提醒 - {newTodo.dueDate}</div>
              </div>
            </div>
            <Space style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
              <Tooltip
                color='cyan'
                title={
                  <>
                    <Typography.Text keyboard style={{ color: colorTextLightSolid }}>
                      esc
                    </Typography.Text>
                    退出编辑
                  </>
                }
              >
                <Button
                  icon={<CloseOutlined />}
                  type='default'
                  onClick={handleCancel}
                  size='small'
                />
              </Tooltip>

              <Button
                icon={<CheckOutlined />}
                type='primary'
                onClick={handleConfirm}
                size='small'
              />
            </Space>
          </Space>
        </div>
        <Modal open={isModalOpen} onCancel={closeModal} destroyOnClose footer={null}>
          <TodoForm
            initialTodo={newTodo}
            onEdit={t => {
              setNewTodo(t);
              closeModal();
            }}
          />
        </Modal>
      </>
    );
  }

  // 常态
  return (
    <TodoItemRightClickMenu
      onComplete={() => onComplete(todo)}
      onDelete={() => onDelete(todo)}
      onEdit={() => onEdit(todo)}
    >
      <div style={{ display: 'flex', width: '100%' }}>
        <TodoRadio isNew={false} onClick={() => onComplete(todo)} />
        <div style={{ flex: 1 }} onDoubleClick={onDoubleClick}>
          <Typography.Text delete={todo.completed}>{todo.title}</Typography.Text>
          <Typography.Paragraph type='secondary'>{todo.description}</Typography.Paragraph>
          <div style={{ fontSize: '12px', color: '#999' }}>每日提醒 - {todo.dueDate}</div>
        </div>
      </div>
    </TodoItemRightClickMenu>
  );
}

function TodoRadio({ isNew, onClick }: { isNew: boolean; onClick?: () => void }) {
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
        margin: '4px',
        marginRight: '16px',
        flexShrink: 0,
      }}
    />
  );
}

type RightClickMenuProps = {
  children: React.ReactNode;
  onDelete: () => void;
  onComplete: () => void;
  onEdit: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        },
      ],
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
      // TODO
    } else if (key === '3') {
      onDelete();
    }
  };

  return (
    <Dropdown
      menu={{ items, onClick }}
      trigger={['contextMenu']}
      onOpenChange={isOpen => {
        setIsOpen(isOpen);
      }}
    >
      <div
        style={{
          border: isOpen ? '1px solid #1890ff' : '1px solid #d9d9d9',
          borderRadius: '4px',
          padding: '12px 16px',
          transition: 'border 0.2s ease-in-out',
          boxShadow: isOpen ? '0 0 8px rgba(24, 144, 255, 0.5)' : 'none',
          marginTop: '10px',
        }}
      >
        {children}
      </div>
    </Dropdown>
  );
}
