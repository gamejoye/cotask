import { operations } from '@cotask/types';

type CreateGroupBody =
  operations['GroupsController_createGroup']['requestBody']['content']['application/json'];

// eslint-disable-next-line max-len
type CreateGroupResponse =
  operations['GroupsController_createGroup']['responses']['201']['content']['application/json'];

const API_URL = import.meta.env.VITE_BASE_URL;
export function createGroupApi(body: CreateGroupBody): Promise<CreateGroupResponse | null> {
  return fetch(`${API_URL}/groups`, {
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
