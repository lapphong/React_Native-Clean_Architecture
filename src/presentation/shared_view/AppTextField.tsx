import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppColors, ThemeData} from 'presentation/presentation';

interface TextFieldProps extends TextInputProps {
  theme: ThemeData;
  label: string;
  iconName: string;
  error?: string;
  password?: boolean;
  onFocus?: () => void;
}

export const AppTextField: React.FC<TextFieldProps> = ({
  theme,
  label,
  iconName,
  error,
  password = false,
  onFocus = () => {},
  ...props
}) => {
  const stylesData = styles(theme);
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{marginBottom: 20}}>
      <Text
        style={[theme.getTheme.textTheme.labelMedium, {color: AppColors.purple, marginBottom: 8}]}>
        {label}
      </Text>
      <View
        style={[
          stylesData.inputContainer,
          {
            borderColor: error
              ? theme.getTheme.textInput.error
              : isFocused
              ? theme.getTheme.textInput.textInputBorderColor
              : AppColors.grey,
            alignItems: 'center',
          },
        ]}>
        <Icon
          name={iconName}
          style={{
            color: isFocused ? theme.getTheme.textInput.textInputBorderColor : AppColors.grey,
            fontSize: (22).rps,
            marginRight: 10,
          }}
        />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          placeholderTextColor={theme.getTheme.textInput.hintTextColor}
          style={{color: AppColors.purple, flex: 1}}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: AppColors.purple, fontSize: (22).rps}}
          />
        )}
      </View>
      {error && <Text style={{marginTop: 7, color: AppColors.red, fontSize: 12}}>{error}</Text>}
    </View>
  );
};

const styles = (theme: ThemeData) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      height: (55).rps,
      width: '100%',
      borderRadius: 10,
      backgroundColor: theme.getTheme.colorScheme.background,
      paddingHorizontal: 15,
      borderWidth: 1.5,
    },
  });
