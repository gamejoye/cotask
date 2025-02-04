import { components } from './generated/openapi';

export enum PriorityTypes {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum FrequencyTypes {
  NONE = 'NONE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export type TodoVo = components['schemas']['TodoVo'];
export type GroupVo = components['schemas']['GroupVo'];
export type UserVo = components['schemas']['UserVo'];

export const frequencyTypes = [
  FrequencyTypes.NONE,
  FrequencyTypes.DAILY,
  FrequencyTypes.WEEKLY,
  FrequencyTypes.MONTHLY,
  FrequencyTypes.YEARLY,
] as const;

export type FrequencyOptions = components['schemas']['TodoVo']['frequencyOption'];
