import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  AutoComplete,
  AutoCompleteProps,
  Tag,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import Modal from 'antd/es/modal/Modal';
import { useMemo, useState } from 'react';
import CotaskDatePicker from '@cotask-fe/shared/components/CotaskDatePicker';
import { FrequencyOptions, FrequencyTypes, frequencyTypes } from '@cotask/types';
import dayjs from 'dayjs';
import { useLastState } from '@cotask-fe/shared/hooks';
import { Todo } from '@cotask-fe/shared/models';
import { useAiTodoTitle } from '../hooks';
import { AlertOutlined } from '@ant-design/icons';
import { debounce } from '@cotask/utils';
import { useAiTodoDescription } from '../hooks/useAiTodoDescription';

const { TextArea } = Input;

export type Props = {
  initialTodo?: Todo;
  onEdit: (todo: Todo) => void;
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

type FormValues = Pick<Todo, 'title' | 'description' | 'priority' | 'dueDate' | 'frequency'>;

type AutoCompleteLabelProps = {
  value: string;
};

function AutoCompleteLabel({ value }: AutoCompleteLabelProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 8,
        padding: '4px 0',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          wordBreak: 'break-all',
          whiteSpace: 'pre-wrap',
          lineHeight: '1.5',
          flex: 1,
        }}
      >
        {value}
      </div>
      <Tag color='#108ee9' icon={<AlertOutlined />}>
        AI建议
      </Tag>
    </div>
  );
}

export default function TodoForm({ initialTodo = new Todo(), onEdit }: Props) {
  const [form] = useForm<Todo>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [frequencyOption, setFrequencyOption] = useState<FrequencyOptions | undefined>(undefined);
  const [frequency, setFrequency, lastFrequency] = useLastState<FrequencyTypes>(
    FrequencyTypes.NONE
  ); // 用于控制CotaskDatePicker的initialFrequency
  const [internalTodo, setInternalTodo] = useState<Todo>(initialTodo);
  const { data: suggestions, loading } = useAiTodoTitle(internalTodo);
  const { data: descriptionSuggestions, loading: descriptionLoading } =
    useAiTodoDescription(internalTodo);
  const titleOptions = useMemo<AutoCompleteProps['options']>(() => {
    return suggestions.map(s => ({
      value: s,
      label: <AutoCompleteLabel value={s} />,
      disabled: loading,
    }));
  }, [suggestions, loading]);
  const descriptionOptions = useMemo<AutoCompleteProps['options']>(() => {
    return descriptionSuggestions.map(s => ({
      value: s,
      label: <AutoCompleteLabel value={s} />,
      disabled: descriptionLoading,
    }));
  }, [descriptionSuggestions, descriptionLoading]);

  const onTitleChange = debounce((value: string) => {
    setInternalTodo({ ...internalTodo, title: value });
  }, 1000);

  const onDescriptionChange = debounce((value: string) => {
    setInternalTodo({ ...internalTodo, description: value });
  }, 2000);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (options: FrequencyOptions | undefined) => {
    // 表单里的frequency需要同步frequencyOption.type
    // 因为表单frequency是非受控
    form.setFieldValue('frequency', options?.type ?? 'NONE');
    setFrequencyOption(options);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    // 恢复原来数据
    setFrequency(lastFrequency);
    form.setFieldValue('frequency', lastFrequency);
    setIsModalOpen(false);
  };

  const onFinish = (values: FormValues) => {
    onEdit({
      ...internalTodo,
      ...values,
      frequencyOption: frequencyOption ?? null,
    });
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        initialValues={{
          title: initialTodo.title,
          description: initialTodo.description,
          priority: initialTodo.priority,
          dueDate: initialTodo.dueDate,
          frequency: initialTodo.frequency,
        }}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item<FormValues>
          label='标题'
          name='title'
          rules={[{ required: true, message: '请输入标题！' }]}
        >
          <AutoComplete
            options={titleOptions}
            onChange={onTitleChange}
            placeholder='输入待办事项标题'
          >
            <Input />
          </AutoComplete>
        </Form.Item>

        <Form.Item<FormValues> label='描述' name='description'>
          <AutoComplete
            options={descriptionOptions}
            onChange={onDescriptionChange}
            placeholder='输入待办事项描述'
          >
            <TextArea rows={1} autoSize={{ maxRows: 10 }} />
          </AutoComplete>
        </Form.Item>

        <Form.Item<FormValues>
          label='提醒我'
          name='dueDate'
          getValueProps={value => ({ value: value && dayjs(value) })}
          normalize={value => value && `${dayjs(value).format('YYYY-MM-DD')}`}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item<FormValues> label='优先级' name='priority'>
          <Select
            options={[
              { value: 'LOW', label: '低' },
              { value: 'MEDIUM', label: '中' },
              { value: 'HIGH', label: '高' },
            ]}
          ></Select>
        </Form.Item>

        <Form.Item<FormValues>
          label='重复'
          name='frequency'
          extra={frequencyOption && getFrequencyOptionHintText(frequencyOption)}
        >
          <Select
            options={frequencyTypes.map(f => ({ value: f, label: f }))}
            onChange={val => {
              setFrequency(val);
              showModal();
            }}
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button type='primary' htmlType='submit'>
            保存
          </Button>
        </Form.Item>
      </Form>
      {isModalOpen && (
        <Modal open={true} footer={null} closable={false}>
          <CotaskDatePicker
            initialFrequency={frequency}
            onConfirm={handleOk}
            onCancel={handleCancel}
          />
        </Modal>
      )}
    </>
  );
}

const getFrequencyOptionHintText = (frequencyOption: FrequencyOptions) => {
  if (!frequencyOption) return '';
  const { type, options } = frequencyOption;
  const days = options.days.toSorted();
  const circleTime = options.circleTime;
  if (type === 'DAILY') {
    return `每${circleTime === 1 ? '' : circleTime}天`;
  } else if (type === 'WEEKLY') {
    return `每${circleTime === 1 ? '' : circleTime}周${days.length ? `的(${days.join(',')})` : ''}`;
  } else if (frequencyOption.type === 'MONTHLY') {
    return `每${circleTime === 1 ? '' : circleTime}月${days.length ? `的(${days.join(',')})` : ''}`;
  } else if (type === 'YEARLY') {
    return `每${circleTime === 1 ? '' : circleTime}年${days.length ? `的(${days.join(',')})` : ''}`;
  }
  return '';
};
