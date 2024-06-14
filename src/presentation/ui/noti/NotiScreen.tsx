import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const NotiScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#FFF', flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.loginText}>NotiScreen</Text>
        {/* Các dòng text khác */}
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
