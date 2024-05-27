import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import BootSplash from 'react-native-bootsplash';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  AppInfoHelper,
  ConnectivityHelper,
  DeviceHelper,
  EnvConstants,
  Log,
  UrlConstants,
  ViewUtils,
} from 'shared/shared';
import {container, DI_Type} from 'initializer/initializer';
import {AppUsecase, AuthUsecase, BottomTab, NotiUsecase} from 'domain/domain';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppPreferences, AppRepositoryImpl} from 'data/data';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });

    // Log.d('Test Log.d in shared', {name: 'Test'});
    // Log.e('Test Log.d in shared', {name: 'Test'});
    // Log.d(UrlConstants.appApiBaseUrl, {name: 'URL'});
    // EnvConstants.init();
    // ViewUtils.showAppSnackBar('Test snackbar', 5000);

    async function checkNetworkAvailability() {
      // const connectivityHelper = container.resolve<ConnectivityHelper>(DI_Type.ConnectivityHelper);
      // const isAvailable = await connectivityHelper.isNetworkAvailable;
      // Log.d(`Check: ${isAvailable}`, {name: 'INTERNET'});

      // const appInfoHelper = container.resolve<AppInfoHelper>(DI_Type.AppInfoHelper);
      // await appInfoHelper.init();

      // const deviceHelper = container.resolve<DeviceHelper>(DI_Type.DeviceHelper);
      // const deviceId = await deviceHelper.deviceId;
      // const deviceModelName = await deviceHelper.deviceModelName;
      // const deviceType = deviceHelper.deviceType;
      // const operatingSystem = deviceHelper.operatingSystem;
      // Log.d(`${deviceId}`, {name: 'DEVICE HELPER'});
      // Log.d(`${deviceModelName}`, {name: 'DEVICE HELPER'});
      // Log.d(`${deviceType}`, {name: 'DEVICE HELPER'});
      // Log.d(`${operatingSystem}`, {name: 'DEVICE HELPER'});

      const appPreferences = container.resolve<AppPreferences>(DI_Type.AppPreferences);
      // await appPreferences.clearCurrentUserData();
      Log.d(`isFirstLogin ${await appPreferences.isFirstLogin}`, {
        name: 'APP Preferences',
      });

      Log.d(`isDarkMode ${await appPreferences.isDarkMode}`, {
        name: 'APP Preferences',
      });

      Log.d(`isFirstLaunchApp ${await appPreferences.isFirstLaunchApp}`, {
        name: 'APP Preferences',
      });

      Log.d(`accessToken ${await appPreferences.accessToken}`, {
        name: 'APP Preferences',
      });

      Log.d(`refreshToken ${await appPreferences.refreshToken}`, {
        name: 'APP Preferences',
      });

      Log.d(`isLoggedIn ${await appPreferences.isLoggedIn}`, {
        name: 'APP Preferences',
      });

      const appUsecase = container.resolve<AppUsecase>(DI_Type.AppUsecase);
      Log.d(`getInitialHomeDataUseCase ${appUsecase.getInitialHomeDataUseCase}`, {
        name: 'APP USECASE',
      });
      Log.d(`isLoggedInUseCase ${await appUsecase.isLoggedInUseCase}`, {
        name: 'APP USECASE',
      });
      Log.d(`isDarkModeUseCase ${await appUsecase.isDarkModeUseCase}`, {
        name: 'APP USECASE',
      });
      Log.d(`loadInitialResourceUseCase ${await appUsecase.loadInitialResourceUseCase}`, {
        name: 'APP USECASE',
      });

      // const authUsecase = container.resolve<AuthUsecase>(DI_Type.AuthUsecase);
      // await authUsecase.loginUsecase({username: 'test', password: '123456'});

      // const notiUsecase = container.resolve<NotiUsecase>(DI_Type.NotiUsecase);
      // const output = await notiUsecase.execute(true);
      // Log.d(Log.prettyJson(output));
    }

    // Gọi hàm async để kiểm tra kết nối mạng
    checkNetworkAvailability();

    // Log.d(`${BottomTab.getLabel(BottomTab.home)}`, {name: 'BOTTOM LABEL'});
    // Log.d(`${BottomTab.getLabel(BottomTab.notifications)}`, {name: 'BOTTOM LABEL'});
    // Log.d(`${BottomTab.getLabel(BottomTab.setting)}`, {name: 'BOTTOM LABEL'});

    // Log.d((2).plus(1));
    // Log.d(2?.minus(1));
    // Log.d(2?.div(2));
    // Log.d(2?.times(1));
    // Log.d(2?.truncateDiv(1));
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <Header />
        <Icon name={BottomTab.home} />
        <Icon name={BottomTab.notifications} />
        <Icon name={BottomTab.setting} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come
            back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">Read the docs to discover what to do next:</Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
