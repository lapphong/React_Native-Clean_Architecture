import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import BootSplash from 'react-native-bootsplash';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {EnvConstants, Log, UrlConstants, ViewUtils} from 'shared/shared';
import {duration} from 'moment';

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
    Log.d('Test Log.d in shared');
    Log.e('Test Log.d in shared');
    let json = {
      code: 'test',
      name: 'test',
      des: 'test',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlVG9rZW4iOiJEa252dEhGSm5namc1ZG0zSHAxdmVhTUh4TUVpa1dObCIsImNvZGVVc2VyIjoidGVzdCIsImNvZGVSb2xlIjoiYWRtaW4iLCJuYmYiOjE3MTYxODE0NzcsImV4cCI6MTcxNjc4NjI3NywiaWF0IjoxNzE2MTgxNDc3fQ.wgrBhzY3FnXHXhS_ZqDMYYMAUFHHAoZBsHr5TdupCh0',
      refeshToken: '',
      role: 'admin',
      phone: '0987654321',
      expirationTime: 604800,
    };
    Log.d(Log.prettyJson(json));
    Log.d(UrlConstants.appApiBaseUrl);
    EnvConstants.init();

    // ViewUtils.showAppSnackBar('Test snackbar',5000);
    // Log.d((2).plus(1));
    // Log.d(2?.minus(1));
    // Log.d(2?.div(2));
    // Log.d(2?.times(1));
    // Log.d(2?.truncateDiv(1));

    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come back to see your
            edits.
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
