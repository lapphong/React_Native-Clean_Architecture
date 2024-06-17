import {useTheme} from 'presentation/presentation';
import {View, ActivityIndicator} from 'react-native';

export const FooterView = ({size = (50).rps}: {size?: number}) => {
  const theme = useTheme();

  return (
    <View style={{paddingBottom: 5}}>
      <ActivityIndicator size={size} color={theme.getTheme.progressIndicatorTheme.color} />
    </View>
  );
};
