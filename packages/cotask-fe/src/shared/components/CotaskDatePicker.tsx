import { Button, Checkbox, InputNumber, InputNumberProps, Radio, Space, Typography } from "antd";

import { useEffect, useState } from "react";
import CustomCheckboxGrid from "./CustomCheckbox";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

export const frequencyTypes = ['NONE', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'] as const;

type DailyPickerProps = {
  onDaysChange: (val: number) => void
}

type WeeklyPickerProps = {
  onWeeksChange: (val: { weeks: number, selectDays: number[] }) => void
}

type MonthlyPickerProps = {
  onMonthsChange: (val: { months: number, selectDays: number[] }) => void
}

type YearlyPickerProps = {
  onYearsChange: (val: { years: number, selectMonths: number[] }) => void
}

export type FrequencyOptions =
  | { type: 'DAILY', options: Parameters<DailyPickerProps['onDaysChange']>[0] }
  | { type: 'WEEKLY', options: Parameters<WeeklyPickerProps['onWeeksChange']>[0] }
  | { type: 'MONTHLY', options: Parameters<MonthlyPickerProps['onMonthsChange']>[0] }
  | { type: 'YEARLY', options: Parameters<YearlyPickerProps['onYearsChange']>[0] }

export type Props = {
  initialFrequency?: typeof frequencyTypes[number],
  frequency?: typeof frequencyTypes[number],
  onChange?: (frequency: typeof frequencyTypes[number]) => void,
  onConfirm: (arg?: FrequencyOptions) => void,
  onCancel?: () => void,
}

export default function CotaskDatePicker({
  initialFrequency,
  frequency,
  onChange,
  onConfirm,
  onCancel
}: Props) {
  const [vals, setVals] = useState<FrequencyOptions | undefined>();
  const [interalVal, setInteralVal] = useState<typeof frequencyTypes[number]>(initialFrequency || frequencyTypes[0]);
  const isControlled = frequency !== undefined;
  let component = null;
  switch (isControlled ? frequency : interalVal) {
    case 'DAILY':
      component = <DailyPicker onDaysChange={(val) => setVals({ type: 'DAILY', options: val })} />;
      break;
    case 'WEEKLY':
      component = <WeeklyPicker onWeeksChange={(val) => setVals({ type: 'WEEKLY', options: val })} />;
      break;
    case 'MONTHLY':
      component = <MonthlyPicker onMonthsChange={(val) => setVals({ type: 'MONTHLY', options: val })} />;
      break;
    case 'YEARLY':
      component = <YearlyPicker onYearsChange={(val) => setVals({ type: 'YEARLY', options: val })} />;
      break;
  }
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Space>
        <Typography.Text>频率</Typography.Text>
        <Radio.Group name="频次" defaultValue={initialFrequency || frequencyTypes[0]} value={isControlled ? frequency : interalVal} onChange={(e) => {
          if (isControlled) {
            onChange && onChange(e.target.value);
          } else {
            setInteralVal(e.target.value);
          }
        }}>
          {frequencyTypes.map((type) => (
            <Radio key={type} value={type}>
              {type}
            </Radio>
          ))}
        </Radio.Group>
      </Space>
      {component}
      <Space style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
        <Button
          icon={<CloseOutlined />}
          type="default"
          onClick={() => onCancel && onCancel()}
          size="small"
        />

        <Button
          icon={<CheckOutlined />}
          type="primary"
          onClick={() => onConfirm(vals)}
          size="small"
        />
      </Space>
    </Space >
  );
}

function DailyPicker({ onDaysChange }: DailyPickerProps) {
  const handleChange: InputNumberProps['onChange'] = (value) => {
    onDaysChange(value !== null ? Number(value) : 1);
  };
  useEffect(() => {
    onDaysChange(1);
  }, []);
  return (
    <Space>
      <span>每</span>
      <InputNumber min={1} max={9999} defaultValue={1} onChange={handleChange} />
      <span>天</span>
    </Space>
  )
}

const weeklyOptions = [
  { label: '一', value: 1 },
  { label: '二', value: 2 },
  { label: '三', value: 3 },
  { label: '四', value: 4 },
  { label: '五', value: 5 },
  { label: '六', value: 6 },
  { label: '日', value: 7 },
];

function WeeklyPicker({ onWeeksChange }: WeeklyPickerProps) {
  const [weeks, setWeeks] = useState(1);
  const [selectDays, setSelectDays] = useState<number[]>([]);
  const handleWeeksChange: InputNumberProps['onChange'] = (value) => {
    value = value !== null ? Number(value) : 1
    onWeeksChange({
      weeks: value,
      selectDays,
    });
    setWeeks(value);
  };

  const handleSelectDaysChange = (days: number[]) => {
    onWeeksChange({
      weeks,
      selectDays: days
    });
    setSelectDays(days);
  }
  useEffect(() => {
    onWeeksChange({
      weeks: 1,
      selectDays: []
    });
  }, []);

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Space>
        <span>每</span>
        <InputNumber min={1} max={9999} defaultValue={1} onChange={handleWeeksChange} />
        <span>周</span>
      </Space>
      <Checkbox.Group options={weeklyOptions} onChange={handleSelectDaysChange} />
    </Space>
  )
}

const monthlyOptions = Array.from({ length: 31 }, (_, i) => ({ key: (i + 1) + '', value: (i + 1) + '', label: (i + 1) + '' }));

function MonthlyPicker({ onMonthsChange }: MonthlyPickerProps) {
  const [months, setMonths] = useState(1);
  const [selectDays, setSelectDays] = useState<number[]>([]);
  const handleMonthsChange: InputNumberProps['onChange'] = (value) => {
    value = value !== null ? Number(value) : 1
    onMonthsChange({
      months: value,
      selectDays,
    });
    setMonths(value);
  };
  const onChange = (checkedValues: string[]) => {
    const values = checkedValues.map(d => +d);
    onMonthsChange({
      months,
      selectDays: values,
    })
    setSelectDays(values);
  };
  useEffect(() => {
    onMonthsChange({
      months: 1,
      selectDays: []
    });
  }, []);
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Space>
        <span>每</span>
        <InputNumber min={1} max={9999} defaultValue={1} onChange={handleMonthsChange} />
        <span>月</span>
      </Space>
      <CustomCheckboxGrid options={monthlyOptions} onChange={onChange} />
    </Space>
  )
}

const yearlyOptions = Array.from({ length: 12 }, (_, i) => ({ key: (i + 1) + '', value: (i + 1) + '', label: (i + 1) + '月' }));

function YearlyPicker({ onYearsChange }: YearlyPickerProps) {
  const [years, setYears] = useState(1);
  const [selectMonths, setSelectMonths] = useState<number[]>([]);
  const handleYearsChange: InputNumberProps['onChange'] = (value) => {
    value = value !== null ? Number(value) : 1
    onYearsChange({
      years: value,
      selectMonths,
    });
    setYears(value);
  };
  const onChange = (checkedValues: string[]) => {
    const values = checkedValues.map(d => +d);
    onYearsChange({
      years,
      selectMonths: values,
    })
    setSelectMonths(values);
  }
  useEffect(() => {
    onYearsChange({
      years: 1,
      selectMonths: []
    });
  }, []);
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Space>
        <span>每</span>
        <InputNumber min={1} max={9999} defaultValue={1} onChange={handleYearsChange} />
        <span>年</span>
      </Space>
      <CustomCheckboxGrid options={yearlyOptions} onChange={onChange} />
    </Space>
  )
}