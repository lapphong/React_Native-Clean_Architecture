import {View} from 'react-native';
import {Log} from 'shared/shared';

export const ErrorView = () => {
  Log.e('Error View', {name: 'FlashList Obseverse'});
  return <View></View>;
};
