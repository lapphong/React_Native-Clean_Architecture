import {createStackNavigator} from '@react-navigation/stack';
import {navigator} from 'app/app';
import {AppNavigatorImpl, LoginScreen, MainScreen} from 'presentation/presentation';

const Stack = createStackNavigator();

export const AppRoute = ({isLogged = false}: {isLogged: boolean}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isLogged ? (
        <Stack.Screen name="main" component={AppMainRoute} />
      ) : (
        <Stack.Screen name="auth" component={AppAuthRoute} />
      )}
    </Stack.Navigator>
  );
};

export const AppAuthRoute = () => {
  (navigator as AppNavigatorImpl).initialize();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export const AppMainRoute = () => {
  (navigator as AppNavigatorImpl).initialize();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
    </Stack.Navigator>
  );
};
