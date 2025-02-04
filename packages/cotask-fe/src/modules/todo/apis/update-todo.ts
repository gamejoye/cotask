import { operations } from '@cotask/types';

export type UpdateTodoRequestParams =
  operations['TodosController_updateTodo']['parameters']['path'];

export type UpdateTodoRequestBody =
  operations['TodosController_updateTodo']['requestBody']['content']['application/json'];

export type UpdateTodoResponse =
  // eslint-disable-next-line max-len
  operations['TodosController_updateTodo']['responses']['200']['content']['application/json'];

const API_URL = import.meta.env.VITE_BASE_URL;

export function updateTodoApi(
  params: UpdateTodoRequestParams,
  body: UpdateTodoRequestBody
): Promise<UpdateTodoResponse | null> {
  const { id } = params;
  return fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
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
