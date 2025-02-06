import { List, Typography, Button, Flex } from 'antd';
import { useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import TodoItem from './TodoItem';
import { Todo } from '@cotask-fe/shared/models';
import dayjs from 'dayjs';
import InfiniteScroll from 'react-infinite-scroll-component';

type DOMId = string;

export type Props = {
  title: string;
  todos: Todo[];
  onDelete: (todo: Todo) => void;
  onComplete: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  loadMore: () => void;
  hasMore: boolean;
  container: DOMId;
};

type DataSource = { type: 'edit' | 'show'; todo: Todo }[];

export default function TodoList({
  todos,
  title,
  onDelete,
  onComplete,
  onEdit,
  loadMore,
  hasMore,
  container,
}: Props) {
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Todo | null>(null);
  const dataSource = useMemo(() => {
    const dataSource: DataSource = [];
    if (creating) {
      dataSource.push({
        type: 'edit',
        todo: { ...new Todo(), dueDate: dayjs().format('YYYY-MM-DD') },
      });
    }
    dataSource.push(
      ...todos
        .filter(todo => !todo.completed)
        .map<DataSource[number]>(todo => ({
          type: editing?.id === todo.id ? 'edit' : 'show',
          todo,
        }))
    );
    return dataSource;
  }, [todos, creating, editing]);

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
    <InfiniteScroll
      dataLength={todos.length}
      next={loadMore}
      hasMore={hasMore}
      loader={
        <div
          style={{
            textAlign: 'center',
            padding: 10,
          }}
        >
          <Typography.Text type='secondary'>loading...</Typography.Text>
        </div>
      }
      endMessage={
        <div
          style={{
            textAlign: 'center',
            padding: 10,
          }}
        >
          <Typography.Text type='secondary'>没有更多待办事项了</Typography.Text>
        </div>
      }
      scrollableTarget={container}
    >
      <List
        dataSource={dataSource}
        style={{ width: '100%' }}
        locale={{
          emptyText: '',
        }}
        header={
          <Flex justify='space-between'>
            <Typography.Title level={2} style={{ margin: 0 }}>
              {title}
            </Typography.Title>
            <Button
              icon={<PlusOutlined />}
              onClick={handleNewTodo}
              size='large'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              新建任务
            </Button>
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
    </InfiniteScroll>
  );
}
