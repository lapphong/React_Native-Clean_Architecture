import {AppButton, AppDimen, useTheme} from 'presentation/presentation';
import {View} from 'react-native';
import {Log, VoidCallback} from 'shared/shared';

export const NoMoreItemView = ({
  isRetry = false,
  onRetry,
}: {
  isRetry?: boolean;
  onRetry?: VoidCallback;
}) => {
  Log.e('No More Item', {name: 'FlashList Obseverse'});
  const theme = useTheme();

  return isRetry ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AppButton
        onPressed={isRetry && onRetry}
        text="Retry"
        theme={theme}
        width={(AppDimen.current.screenWidth / 3).rps}
        borderRadius={30}
        background={theme.getTheme.elevatedButtonTheme.backgroundColor}
      />
    </View>
  ) : (
    <View></View>
  );
};
