import Svg, { Circle, Path } from 'react-native-svg';

type IconProps = { size?: number; color?: string };

export function HomeIcon({ size = 22, color = '#1A2B2A' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 11.5 12 4l8 7.5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function SearchIcon({ size = 20, color = '#6B7280' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth={2} />
      <Path d="M20 20l-3.5-3.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function BellIcon({ size = 22, color = '#1A2B2A' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M10 19a2 2 0 0 0 4 0" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function PersonIcon({ size = 22, color = '#1A2B2A' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="3.5" stroke={color} strokeWidth={2} />
      <Path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function SearchTabIcon({ size = 22, color = '#1A2B2A' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="10" cy="10" r="6" stroke={color} strokeWidth={2} />
      <Path d="M18.5 18.5 15 15" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function PinIcon({ size = 16, color = '#1F6F5C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Circle cx="12" cy="9.5" r="2.3" stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function StarIcon({ size = 13, color = '#F39A1F' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.7 6.1 20.6l1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z" />
    </Svg>
  );
}

export function FilterIcon({ size = 18, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 6h16M8 12h12M11 18h9" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx="5" cy="12" r="1.6" fill={color} />
      <Circle cx="8" cy="18" r="1.6" fill={color} />
    </Svg>
  );
}

export function ArrowRightIcon({ size = 16, color = '#1A2B2A' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 18, color = '#6B7280' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 6l6 6-6 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function BookmarkIcon({ size = 16, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 4h12v16l-6-3.5L6 20V4Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

export function VerifiedIcon({ size = 14, color = '#1F6F5C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Circle cx="12" cy="12" r="10" fill={color} />
      <Path d="M8 12.3l2.6 2.6L16.3 9" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function GroupIcon({ size = 14, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="8" cy="9" r="3" stroke={color} strokeWidth={2} />
      <Circle cx="16" cy="9" r="3" stroke={color} strokeWidth={2} />
      <Path d="M2 20c0-2.8 2.7-5 6-5s6 2.2 6 5M10 20c0-2.8 2.7-5 6-5s6 2.2 6 5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function GraduationCapIcon({ size = 22, color = '#1F6F5C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M2 9l10-4 10 4-10 4-10-4Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M6 11v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M21 9v5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function BookOpenIcon({ size = 22, color = '#1F6F5C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 6c-1.8-1.4-4.3-2-7-2v13c2.7 0 5.2.6 7 2 1.8-1.4 4.3-2 7-2V4c-2.7 0-5.2.6-7 2Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M12 6v13" stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function CalculatorIcon({ size = 22, color = '#1F6F5C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke={color} strokeWidth={2} />
      <Path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function BlocksIcon({ size = 22, color = '#1F6F5C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 4h6v6H4V4Zm10 2h6v8h-6V6ZM4 14h6v6H4v-6Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

export function TranslateIcon({ size = 22, color = '#1F6F5C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} />
      <Path d="M3 12h18M12 3c2.3 2.5 3.5 5.6 3.5 9s-1.2 6.5-3.5 9c-2.3-2.5-3.5-5.6-3.5-9S9.7 5.5 12 3Z" stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function HouseKeyIcon({ size = 20, color = '#F39A1F' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 11.5 12 4l8 7.5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="12" cy="15" r="1.6" stroke={color} strokeWidth={2} />
    </Svg>
  );
}