import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Switch} from 'react-native';
import {BaseProviderState, appRedux, settingRedux} from 'app/app';
import {AppButton, AppColors, AppDimen, useTheme} from 'presentation/presentation';
import {useSelector} from 'react-redux';

export const SettingScreen = () => {
  const theme = useTheme();
  const isDarkTheme = useSelector(appRedux.getSelector).isDarkTheme;
  const [state, setState] = useState(isDarkTheme);

  const handleThemeChange = async (value: boolean) => {
    setState(value);
    await appRedux.onAppThemeChanged(value);
  };

  return (
    <BaseProviderState redux={settingRedux}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Switch
            trackColor={{false: AppColors.gray, true: AppColors.purple}}
            thumbColor={theme.getTheme.switchTheme.thumbColor}
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}], height: (30).rps}}
            value={state}
            onValueChange={handleThemeChange}
          />
          <AppButton
            theme={theme}
            text="Đăng xuất"
            width={(AppDimen.current.screenWidth / 2).rps}
            background={theme.getTheme.elevatedButtonTheme.backgroundColor}
            onPressed={async () => await appRedux.onAppLogoutPressed()}
          />
        </View>
      </ScrollView>
    </BaseProviderState>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
});
