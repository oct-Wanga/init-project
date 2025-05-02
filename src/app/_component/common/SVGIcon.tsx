import { IconName } from '@assets/iconNames';

type SVGIconProps = {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
};

export default function SVGIcon({ name, size = 24, color = 'currentColor', className }: SVGIconProps) {
  return (
    <svg width={size} height={size} fill={color} className={className} aria-hidden="true">
      <use href={`#${name}`} />
    </svg>
  );
}
