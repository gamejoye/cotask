import { theme } from 'antd';
import './index.css';

export type Props = {
  title: string;
  content: string;
  active?: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function CotaskCard({ title, content, active = false, onClick }: Props) {
  const { token } = theme.useToken();
  const dynamicStyle = {
    '--active-color': token.colorPrimary,
    '--active-bg': token.colorPrimaryBg,
    '--border-color': token.colorBorderSecondary,
    '--hover-bg': token.colorFillTertiary,
    '--text-color': token.colorTextHeading,
    '--text-secondary': token.colorTextDescription,
  } as React.CSSProperties;
  return (
    <div className={`nav-card${active ? ' active' : ''}`} style={dynamicStyle} onClick={onClick}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}
