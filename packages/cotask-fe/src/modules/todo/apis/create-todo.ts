import { operations } from '@cotask/types';

export type CreateTodoRequestBody =
  operations['TodosController_createTodo']['requestBody']['content']['application/json'];

export type CreateTodoResponse =
  operations['TodosController_createTodo']['responses']['201']['content']['application/json'];

const API_URL = import.meta.env.VITE_BASE_URL;

export function createTodoApi(body: CreateTodoRequestBody): Promise<CreateTodoResponse | null> {
  return fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      return null;
    });
}
