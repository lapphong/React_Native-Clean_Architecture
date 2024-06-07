import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, MainScreen} from 'presentation/presentation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export const AppMainRoute = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
    </Stack.Navigator>
  );
};
