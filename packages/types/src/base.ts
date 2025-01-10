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

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  frequency: FrequencyTypes;
  frequencyOptions?: FrequencyOptions;
  priority?: PriorityTypes;
  dueDate: string;
  createAt: string;
};

export type Group = {
  id: number;
  name: string;
};

export const frequencyTypes = ['NONE', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'] as const;
// export type FrequencyTypes = (typeof frequencyTypes)[number];

export type DailyPickerProps = {
  onDaysChange: (val: number) => void;
};

export type WeeklyPickerProps = {
  onWeeksChange: (val: { weeks: number; selectDays: number[] }) => void;
};

export type MonthlyPickerProps = {
  onMonthsChange: (val: { months: number; selectDays: number[] }) => void;
};

export type YearlyPickerProps = {
  onYearsChange: (val: { years: number; selectMonths: number[] }) => void;
};

export type FrequencyOptions =
  | { type: 'DAILY'; options: Parameters<DailyPickerProps['onDaysChange']>[0] }
  | { type: 'WEEKLY'; options: Parameters<WeeklyPickerProps['onWeeksChange']>[0] }
  | { type: 'MONTHLY'; options: Parameters<MonthlyPickerProps['onMonthsChange']>[0] }
  | { type: 'YEARLY'; options: Parameters<YearlyPickerProps['onYearsChange']>[0] };
