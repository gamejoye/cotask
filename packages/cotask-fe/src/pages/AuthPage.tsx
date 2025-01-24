import AuthLayout from '@cotask-fe/modules/auth/components/AuthLayout';
import SignInForm from '@cotask-fe/modules/auth/components/SignInForm';
import { useAuth } from '@cotask-fe/modules/auth/hooks';
import { message } from 'antd';
import { useNavigate } from 'react-router';

export default function AuthPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <SignInForm
        onFinish={async ({ email, password }) => {
          const success = await login({ email, password });
          if (!success) {
            message.error('邮箱或密码错误');
          } else {
            navigate('/');
          }
        }}
      />
    </AuthLayout>
  );
}
