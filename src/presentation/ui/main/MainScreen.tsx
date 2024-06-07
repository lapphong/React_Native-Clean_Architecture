import {AppNavigator, AppPopupInfo} from 'domain/domain';
import {DI_Type, container} from 'initializer/initializer';
import {AppNavigatorImpl} from 'presentation/presentation';
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Log} from 'shared/shared';

export const MainScreen = () => {
  const appNavigator = container.resolve<AppNavigator>(DI_Type.AppNavigator);
  (appNavigator as AppNavigatorImpl).initialize();

  return (
    <SafeAreaView style={{backgroundColor: '#FFF', flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.loginText}>Main</Text>
        <Button
          title="currentBottomTab"
          onPress={() => {
            Log.d(`currentBottomTab ${(appNavigator as AppNavigatorImpl).currentBottomTab}`, {
              name: 'currentBottomTab',
            });
          }}
        />
        <Button
          title="canPopSelfOrChildren"
          onPress={() => {
            Log.d(
              `canPopSelfOrChildren: ${(appNavigator as AppNavigatorImpl).canPopSelfOrChildren}`,
              {
                name: 'canPopSelfOrChildren',
              },
            );
          }}
        />
        <Button
          title="getCurrentRouteName"
          onPress={() => {
            Log.d((appNavigator as AppNavigatorImpl).getCurrentRouteName, {
              name: 'getCurrentRouteName',
            });
          }}
        />
        <Button
          title="popUntilRootOfCurrentBottomTab"
          onPress={() => {
            (appNavigator as AppNavigatorImpl).popUntilRootOfCurrentBottomTab();
          }}
        />
        <Button
          title="Push"
          onPress={() => {
            (appNavigator as AppNavigatorImpl).push({name: 'auth'});
          }}
        />
        <Button
          title="replace"
          onPress={() => {
            (appNavigator as AppNavigatorImpl).replace({name: 'auth'});
          }}
        />
        <Button
          title="replaceAll"
          onPress={() => {
            (appNavigator as AppNavigatorImpl).replaceAll({name: 'auth'});
          }}
        />
        <Button
          title="pop"
          onPress={() => {
            (appNavigator as AppNavigatorImpl).pop({useRootNavigator: false});
          }}
        />
        <Button
          title="show dialog"
          onPress={async () => {
            await (appNavigator as AppNavigatorImpl).showDialog(
              AppPopupInfo.confirmDialog({
                message: 'Test Show dialog',
                onPressed: () => {
                  (appNavigator as AppNavigatorImpl).pop({useRootNavigator: false});
                },
              }),
            );
          }}
        />
        <Button
          title="show SnackBar"
          onPress={() => {
            (appNavigator as AppNavigatorImpl).showSuccessSnackBar('Test show snack bar');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Màu nền trắng
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Màu chữ đen
  },
});
