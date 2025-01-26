import { operations } from '@cotask/types';

export type GetTodosRequestQuery =
  operations['TodosController_getTodosByGroupId']['parameters']['query'];

export type GetTodosResponse =
  // eslint-disable-next-line max-len
  operations['TodosController_getTodosByGroupId']['responses']['200']['content']['application/json'];

const API_URL = import.meta.env.VITE_BASE_URL;

export function getTodosApi(query: GetTodosRequestQuery): Promise<GetTodosResponse | null> {
  const queryString = Object.entries(query)
    .map(([key, value]) => key + '=' + value)
    .join('&');
  return fetch(`${API_URL}/todos?${queryString}`)
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      return null;
    });
}
