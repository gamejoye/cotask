import { operations } from '@cotask/types';

export type GetTypedTodosRequestQuery =
  | {
      type: 'all';
      query: operations['TodosController_getAllTodos']['parameters']['query'];
    }
  | {
      type: 'today';
      query: operations['TodosController_getTodosByToday']['parameters']['query'];
    };

export type GetTypedTodosResponse =
  | operations['TodosController_getAllTodos']['responses']['200']['content']['application/json']
  // eslint-disable-next-line max-len
  | operations['TodosController_getTodosByToday']['responses']['200']['content']['application/json'];

const API_URL = import.meta.env.VITE_BASE_URL;

export function getTypedTodosApi({
  type,
  query,
}: GetTypedTodosRequestQuery): Promise<GetTypedTodosResponse | null> {
  const queryString = Object.entries(query)
    .map(([key, value]) => key + '=' + value)
    .join('&');
  const path = type === 'today' ? 'todos/today' : 'todos/all';
  return fetch(`${API_URL}/${path}?${queryString}`)
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      return null;
    });
}
