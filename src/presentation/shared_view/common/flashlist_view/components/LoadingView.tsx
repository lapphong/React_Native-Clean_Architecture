import {AppLoading, useTheme} from 'presentation/presentation';

export const LoadingView = () => {
  const theme = useTheme();
  
  return <AppLoading theme={theme} />;
};
