import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {BaseProviderState, MyApp, appRedux, store} from 'app/app';
import {ThemeContext, ThemeData} from 'presentation/presentation';

const App = () => {
  const theme = new ThemeData();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ThemeContext.Provider value={theme}>
          <BaseProviderState redux={appRedux} isNewAppNavigator={false}>
            <MyApp />
          </BaseProviderState>
        </ThemeContext.Provider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
