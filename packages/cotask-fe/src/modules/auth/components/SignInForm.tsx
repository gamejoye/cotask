import {
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons';

import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';

export type Props = {
  onFinish: (params: {}) => void
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function SignInForm({ onFinish }: Props) {
  return (
    <>
      <LoginForm
        title="Cotask"
        subTitle="一款面向团队的多人协同待办事项工具"
        onFinish={onFinish}
      >
        <ProFormText
          name="email"
          fieldProps={{
            size: 'large',
            prefix: <MailOutlined className={'prefixIcon'} />,
          }}
          placeholder={'邮箱: email'}
          rules={[
            {
              required: true,
              message: '请输入邮箱!',
            },
            {
              pattern: emailRegex,
              message: '请输入正确的邮箱！',
            }
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={'密码: password'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
            {
              min: 6,
              message: '密码不能少于6位！',
            }
          ]}
        />
      </LoginForm>
    </>
  )
}

export default SignInForm;