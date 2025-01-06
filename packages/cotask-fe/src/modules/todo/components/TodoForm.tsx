import { Form, Input, Button, Select, DatePicker, Typography, Row, Col } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Todo } from './TodoList';
import Modal from 'antd/es/modal/Modal';
import { useState } from 'react';
import CotaskDatePicker, { FrequencyOptions, frequencyTypes } from '@cotask/shared/components/CotaskDatePicker';
import { useUpdateEffect } from '@cotask/shared/hooks/useUpdateEffect';
import dayjs from 'dayjs';
import { useLastState } from '@cotask/shared/hooks/useLastState';

export type Props = {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

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

type FormValues = Pick<Todo, 'title' | 'priority' | 'dueDate' | 'frequency'>;

export default function TodoForm({
  todo,
  onEdit,
}: Props) {
  const [form] = useForm<Todo>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [frequencyOptions, setFrequencyOptions] = useState<FrequencyOptions | undefined>(undefined);
  const [frequency, setFrequency, lastFrequency] = useLastState<typeof frequencyTypes[number]>('NONE'); // 用于控制CotaskDatePicker的initialFrequency

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (options: FrequencyOptions | undefined) => {
    // 表单里的frequency需要同步frequencyOptions.type
    // 因为表单frequency是非受控
    form.setFieldValue('frequency', options?.type ?? 'NONE');
    setFrequencyOptions(options);
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
      ...todo,
      ...values,
      frequencyOptions
    });
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        initialValues={{
          title: todo.title,
          priority: todo.priority,
          dueDate: todo.dueDate,
          frequency: todo.frequency,
        }}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item<FormValues>
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入标题！' }]}
        >
          <Input placeholder="输入待办事项标题" variant='borderless' />
        </Form.Item>

        <Form.Item<FormValues>
          label="提醒我"
          name="dueDate"
          getValueProps={(value) => ({ value: value && dayjs(value) })}
          normalize={(value) => value && `${dayjs(value).format('YYYY-MM-DD')}`}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item<FormValues>
          label="优先级"
          name="priority"
        >
          <Select options={[
            { value: 'LOW', label: '低' },
            { value: 'MEDIUM', label: '中' },
            { value: 'HIGH', label: '高' },
          ]}>
          </Select>
        </Form.Item>

        <Form.Item<FormValues>
          label="重复"
          name="frequency"
          extra={frequencyOptions && getFrequencyOptionsHintText(frequencyOptions)}
        >
          <Select
            options={frequencyTypes.map((f) => ({ value: f, label: f }))}
            onChange={(val) => { setFrequency(val); showModal(); }}
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
      {isModalOpen && (
        <Modal
          open={true}
          footer={null}
          closable={false}
        >
          <CotaskDatePicker
            initialFrequency={frequency}
            onConfirm={handleOk}
            onCancel={handleCancel}
          />
        </Modal>
      )}
    </>
  );
};


const getFrequencyOptionsHintText = (frequencyOptions: FrequencyOptions) => {
  if (frequencyOptions.type === 'DAILY') {
    return `每${frequencyOptions.options === 1 ? '' : frequencyOptions.options}天`;
  } else if (frequencyOptions.type === 'WEEKLY') {
    const days = frequencyOptions.options.selectDays.sort();
    return `每${frequencyOptions.options.weeks === 1 ? '' : frequencyOptions.options.weeks}周${days.length ? `的(${days.join(',')})` : ''}`;
  } else if (frequencyOptions.type === 'MONTHLY') {
    const days = frequencyOptions.options.selectDays.sort();
    return `每${frequencyOptions.options.months === 1 ? '' : frequencyOptions.options.months}月${days.length ? `的(${days.join(',')})` : ''}`;
  } else if (frequencyOptions.type === 'YEARLY') {
    const months = frequencyOptions.options.selectMonths.sort();
    return `每${frequencyOptions.options.years === 1 ? '' : frequencyOptions.options.years}年${months.length ? `的(${months.join(',')})` : ''}`;
  }
  return '';
}
