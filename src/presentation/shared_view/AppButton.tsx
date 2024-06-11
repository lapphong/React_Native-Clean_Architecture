import React from 'react';
import {AppColors, ThemeData} from 'presentation/presentation';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface AppButtonProps {
  theme: ThemeData;
  text: string;
  background?: string;
  width?: number;
  onPressed?: () => void;
}

export const AppButton: React.FC<AppButtonProps> = ({
  theme,
  text,
  background = AppColors.blue,
  width,
  onPressed,
}) => {
  return (
    <TouchableOpacity
      onPress={onPressed}
      activeOpacity={0.7}
      style={[styles.button, {backgroundColor: background, width: width ?? '100%'}]}>
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
    borderRadius: 10,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
