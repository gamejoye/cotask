import { operations } from '@cotask/types';

export type LoginRequestBody =
  operations['AuthController_login']['requestBody']['content']['application/json'];

export type LoginResponse =
  operations['AuthController_login']['responses']['201']['content']['application/json'];

const API_URL = import.meta.env.VITE_BASE_URL;

export function loginApi(body: LoginRequestBody): Promise<LoginResponse | null> {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      return null;
    });
}
