import React from 'react';
import {AppColors, ThemeData} from 'presentation/presentation';
import {TouchableOpacity, Text, StyleSheet, DimensionValue} from 'react-native';

interface AppButtonProps {
  theme: ThemeData;
  text: string;
  background?: string;
  width?: DimensionValue | undefined;
  borderRadius?: number;
  onPressed?: () => void;
}

export const AppButton: React.FC<AppButtonProps> = ({
  theme,
  text,
  background = AppColors.blue,
  width = '100%',
  borderRadius = 10,
  onPressed,
}) => {
  return (
    <TouchableOpacity
      onPress={onPressed}
      activeOpacity={0.7}
      style={[
        styles.button,
        {backgroundColor: background, width: width, borderRadius: borderRadius},
      ]}>
      <Text
        style={[
          theme.getTheme.textTheme.titleLarge,
          {color: theme.getTheme.elevatedButtonTheme.textButtonColor},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: (55).rps,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
