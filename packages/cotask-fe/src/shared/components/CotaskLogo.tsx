const logoStyle = {
  backgroundImage: `url('/cotask.png')`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};

export type Props = {
  size?: 'small' | 'large';
};

export default function CotaskLogo({ size = 'large' }: Props) {
  const style =
    size === 'large'
      ? { ...logoStyle, width: '64px', height: '64px' }
      : { ...logoStyle, width: '32px', height: '32px' };
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', height: size === 'large' ? '64px' : '32px' }}
    >
      <div style={{ ...style }} />
      <h1>Cotask</h1>
    </div>
  );
}
