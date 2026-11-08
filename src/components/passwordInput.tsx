import { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { colors } from '../theme/colors';
import { styles } from '../theme/styles';

function EyeIcon({ off, size = 20, color }: { off: boolean; size?: number; color: string }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {off ? (
        <>
          <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <Line x1="1" y1="1" x2="23" y2="23" />
        </>
      ) : (
        <>
          <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <Circle cx="12" cy="12" r="3" />
        </>
      )}
    </Svg>
  );
}

export function PasswordInput({
  value,
  onChangeText,
  placeholder,
  maxLength,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  maxLength?: number;
}) {
  const [showLast, setShowLast] = useState(false);
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const masked =
    value.length === 0
      ? ''
      : showLast
      ? '•'.repeat(value.length - 1) + value[value.length - 1]
      : '•'.repeat(value.length);

  const display = visible ? value : masked;

  const handleChange = (text: string) => {
    if (visible) {
      onChangeText(maxLength !== undefined ? text.slice(0, maxLength) : text);
      return;
    }

    if (text.length > value.length) {
      let next = value + text.slice(value.length);
      if (maxLength !== undefined) next = next.slice(0, maxLength);
      onChangeText(next);
      setShowLast(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setShowLast(false), 500);
    } else {
      onChangeText(text.length < value.length ? value.slice(0, text.length) : value);
      setShowLast(false);
    }
  };

  const toggleVisible = () => {
    setShowLast(false);
    setVisible((v) => !v);
  };

  const flat = (StyleSheet.flatten(styles.input) || {}) as Record<string, any>;
  const { margin, marginTop, marginBottom, marginVertical, marginHorizontal, marginLeft, marginRight, ...inputStyle } = flat;
  const wrapperMargin = { margin, marginTop, marginBottom, marginVertical, marginHorizontal, marginLeft, marginRight };

  return (
    <View style={[{ justifyContent: 'center' }, wrapperMargin]}>
      <TextInput
        style={[inputStyle, { paddingRight: 46 }]}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        value={display}
        onChangeText={handleChange}
        selection={visible ? undefined : { start: masked.length, end: masked.length }}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        maxLength={maxLength}
      />
      <TouchableOpacity
        onPress={toggleVisible}
        style={{ position: 'absolute', right: 12, padding: 4 }}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityLabel={visible ? 'Hide password' : 'Show password'}
      >
        <EyeIcon off={visible} color={colors.muted} />
      </TouchableOpacity>
    </View>
  );
}