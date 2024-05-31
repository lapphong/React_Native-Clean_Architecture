import {MyApp, store} from 'app/app';
import React from 'react';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <MyApp />
    </Provider>
  );
};

export default App;
