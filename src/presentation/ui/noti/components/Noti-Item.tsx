import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Msg} from 'domain/domain';
import {useTheme} from 'presentation/presentation';

interface NotiItemProps {
  msg: Msg;
}

export const NotiItem: React.FC<NotiItemProps> = ({msg}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {backgroundColor: msg.isseen ? 'white' : theme.getTheme.colorScheme.primary},
      ]}>
      <Text
        style={[
          theme.getTheme.textTheme.labelMedium,
          {fontSize: (22).rps, fontWeight: 'bold'},
        ]}>{`Cảnh báo! - ${msg.time} 🗓️`}</Text>
      <Text style={[theme.getTheme.textTheme.labelMedium, {fontSize: (18).rps}]}>{msg.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: (5).rps,
    padding: (12).rps,
    borderRadius: 10,
  },
});
