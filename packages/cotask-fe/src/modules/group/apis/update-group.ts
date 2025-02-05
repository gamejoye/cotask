import { operations } from '@cotask/types';

type UpdateGroupParams = operations['GroupsController_updateGroup']['parameters']['path'];

type UpdateGroupBody =
  operations['GroupsController_updateGroup']['requestBody']['content']['application/json'];

// eslint-disable-next-line max-len
type UpdateGroupResponse =
  operations['GroupsController_updateGroup']['responses']['200']['content']['application/json'];

const API_URL = import.meta.env.VITE_BASE_URL;
export function updateGroupApi(
  params: UpdateGroupParams,
  body: UpdateGroupBody
): Promise<UpdateGroupResponse | null> {
  return fetch(`${API_URL}/groups/${params.id}`, {
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
