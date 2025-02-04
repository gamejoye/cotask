import { FrequencyOptions, FrequencyTypes, PriorityTypes, TodoVo, UserVo } from '@cotask/types';
import { User } from './user';

export class Todo implements TodoVo {
  id: number;
  title: string;
  description: string;
  priority: keyof typeof PriorityTypes | null;
  frequency: keyof typeof FrequencyTypes;
  frequencyOption: FrequencyOptions;
  dueDate: string;
  completed: boolean;
  createdBy: UserVo;
  createdAt: string;
  updatedAt: string | null;
  constructor(todo?: Todo) {
    this.id = todo?.id ?? 0;
    this.title = todo?.title ?? '';
    this.description = todo?.description ?? '';
    this.priority = todo?.priority ?? null;
    this.frequency = todo?.frequency ?? FrequencyTypes.NONE;
    this.frequencyOption = todo?.frequencyOption ?? null;
    this.dueDate = todo?.dueDate ?? '';
    this.completed = todo?.completed ?? false;
    this.createdBy = todo?.createdBy ?? new User();
    this.createdAt = todo?.createdAt ?? '';
    this.updatedAt = todo?.updatedAt ?? null;
  }

  static isEmpty(instance: Todo) {
    return instance.id === 0;
  }
}
