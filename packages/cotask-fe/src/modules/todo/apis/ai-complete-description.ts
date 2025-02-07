import { operations } from '@cotask/types';

export type AiCompleteTodoDescriptionRequestBody =
  operations['AiController_completeTodoDescription']['requestBody']['content']['application/json'];

export type AiCompleteTodoDescriptionResponse =
  // eslint-disable-next-line max-len
  operations['AiController_completeTodoDescription']['responses']['201']['content']['application/json'];

const API_URL = import.meta.env.VITE_BASE_URL;

export function aiCompleteTodoDescriptionApi(
  body: AiCompleteTodoDescriptionRequestBody
): Promise<AiCompleteTodoDescriptionResponse> {
  return fetch(`${API_URL}/ai/todo/complete/description`, {
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
