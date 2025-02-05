import { Group } from '@cotask-fe/shared/models';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';

const { TextArea } = Input;

interface GroupFormValues {
  name: string;
  description: string;
}

interface Props {
  group?: Group;
  onSubmit: (values: Group) => void;
}

export default function GroupForm({ group, onSubmit }: Props) {
  const [form] = useForm<GroupFormValues>();

  const handleSubmit = async (values: GroupFormValues) => {
    onSubmit({ ...(group ?? new Group()), ...values });
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({
      name: group?.name ?? '',
      description: group?.description ?? '',
    });
  }, [group]);

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout='vertical'
      style={{ width: '100%' }}
      initialValues={{
        name: group?.name ?? '',
        description: group?.description ?? '',
      }}
    >
      <Form.Item
        label='群组名称'
        name='name'
        rules={[{ required: true, message: '请输入群组名称！' }]}
      >
        <Input placeholder='请输入群组名称' />
      </Form.Item>

      <Form.Item label='描述（可选）' name='description'>
        <TextArea placeholder='请输入群组描述' rows={4} autoSize={{ minRows: 4, maxRows: 6 }} />
      </Form.Item>

      <Form.Item style={{ marginTop: 24, textAlign: 'right' }}>
        <Button type='primary' htmlType='submit' style={{ marginLeft: 8 }}>
          保存
        </Button>
      </Form.Item>
    </Form>
  );
}
