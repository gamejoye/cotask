import { Typography } from 'antd';
import useToken from 'antd/es/theme/useToken';
import { useState } from 'react';

export type Props = {
  options: {
    key: string;
    label: string;
    value: string;
  }[];
  onChange?: (checkedValues: string[]) => void;
};

export default function CustomCheckboxGrid({ options, onChange }: Props) {
  const { colorBgBase, colorPrimary, colorBorder } = useToken()[1];
  const [selecteds, setSelecteds] = useState<string[]>([]);

  const toggle = (day: string) => {
    const newSelected = selecteds.includes(day)
      ? selecteds.filter(d => d !== day)
      : [...selecteds, day];
    setSelecteds(newSelected);
    onChange && onChange(newSelected);
  };

  return (
    <div style={gridContainerStyle}>
      {options.map(({ key, value, label }) => (
        <div
          key={key}
          onClick={() => toggle(value)}
          style={{
            ...gridItemStyle,
            backgroundColor: selecteds.includes(value) ? colorPrimary : colorBgBase,
            border: `1px solid ${colorBorder}`,
            cursor: 'pointer',
          }}
        >
          <Typography.Text type='secondary'>{label}</Typography.Text>
        </div>
      ))}
    </div>
  );
}

const gridContainerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 40px)',
  gap: '8px',
  justifyContent: 'center',
};

const gridItemStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  fontSize: '16px',
  fontWeight: 'bold',
  userSelect: 'none',
  transition: 'all 0.2s ease-in-out',
};
