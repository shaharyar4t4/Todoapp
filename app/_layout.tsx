import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-reanimated';

import AllScreen from './Navigations/Stack/AllScreen';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AllScreen/>
  );
}
