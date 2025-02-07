import { operations } from '@cotask/types';

export type AiCompleteTodoTitleRequestBody =
  operations['AiController_completeTodoTitle']['requestBody']['content']['application/json'];

export type AiCompleteTodoTitleResponse =
  operations['AiController_completeTodoTitle']['responses']['201']['content']['application/json'];

const API_URL = import.meta.env.VITE_BASE_URL;

export function aiCompleteTodoTitleApi(
  body: AiCompleteTodoTitleRequestBody
): Promise<AiCompleteTodoTitleResponse> {
  return fetch(`${API_URL}/ai/todo/complete/title`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      return [];
    });
}
