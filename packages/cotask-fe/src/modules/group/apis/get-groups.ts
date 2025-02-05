import { operations } from '@cotask/types';

export type GetGroupsRequestQuery = operations['GroupsController_getGroups']['parameters']['query'];

export type GetGroupsResponse =
  operations['GroupsController_getGroups']['responses']['200']['content']['application/json'];

const API_URL = import.meta.env.VITE_BASE_URL;

export function getGroupsApi(query: GetGroupsRequestQuery): Promise<GetGroupsResponse | null> {
  const queryString = Object.entries(query)
    .map(([key, value]) => key + '=' + value)
    .join('&');
  return fetch(`${API_URL}/groups?${queryString}`)
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      return null;
    });
}
