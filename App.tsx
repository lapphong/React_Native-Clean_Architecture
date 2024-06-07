import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {MyApp, store} from 'app/app';
import {ThemeContext, ThemeData} from 'presentation/presentation';

const App = () => {
  const theme = new ThemeData();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ThemeContext.Provider value={theme}>
          <MyApp />
        </ThemeContext.Provider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
