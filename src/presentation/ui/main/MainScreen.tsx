import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BaseProviderState, appRedux, mainRedux} from 'app/app';
import {AppColors, AppNavigatorImpl, useTheme} from 'presentation/presentation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DI_Type, container} from 'initializer/initializer';
import {AppNavigator, BottomTab} from 'domain/domain';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

export const MainScreen = () => {
  const theme = useTheme();
  const isDarkTheme = useSelector(appRedux.getSelector).isDarkTheme;
  const navigator = container.resolve<AppNavigator>(DI_Type.AppNavigator);

  return (
    <BaseProviderState redux={mainRedux}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            const iconName =
              BottomTab.tabIcons[route.name as BottomTab]?.icon || 'default-icon-name';
            return <Icon name={iconName} color={color} size={size} />;
          },
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.getTheme.bottomBar.background,
            height: (50).rps,
            paddingTop: 5,
            borderTopWidth: isDarkTheme ? 0 : 1,
          },
          tabBarActiveTintColor: AppColors.purple,
          tabBarInactiveTintColor: 'gray',
          tabBarLabel: ({color}) => (
            <Text style={{color, paddingBottom: 5}}>
              {BottomTab.getLabel(route.name as BottomTab)}
            </Text>
          ),
          tabBarLabelStyle: theme.getTheme.textTheme.labelMedium,
        })}>
        {(navigator as AppNavigatorImpl).tabRoutes.map(route => (
          <Tab.Screen key={route.name} name={route.name} component={route.component} />
        ))}
      </Tab.Navigator>
    </BaseProviderState>
  );
};
