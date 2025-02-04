import { operations } from '@cotask/types';

export type DeleteTodoRequestParams =
  operations['TodosController_deleteTodo']['parameters']['path'];

export type DeleteTodoResponse =
  operations['TodosController_deleteTodo']['responses']['200']['content']['application/json'];

const API_URL = import.meta.env.VITE_BASE_URL;

export function deleteTodoApi(params: DeleteTodoRequestParams): Promise<DeleteTodoResponse | null> {
  return fetch(`${API_URL}/todos/${params.id}`, {
    method: 'DELETE',
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
