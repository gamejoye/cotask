import { loginApi, LoginRequestBody } from '../apis/login';
import useAuthStore from '../store';

// 管理认证信息、用户信息
export function useAuth() {
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const storeLogin = useAuthStore(state => state.login);
  const storeLogout = useAuthStore(state => state.logout);
  // 登录函数 返回是否成功标识
  const login = async (body: LoginRequestBody) => {
    try {
      const res = await loginApi(body);
      if (res && res.data && (res.statusCode + '').startsWith('2')) {
        const { user } = res.data;
        storeLogin(user);
        return true;
      }
      throw new Error();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      storeLogout();
      return false;
    }
  };
  const logout = async () => {
    try {
      // TODO logout endpoint
    } finally {
      storeLogout();
    }
  };
  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}
