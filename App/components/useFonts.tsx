import * as Font from 'expo-font';

const useFonts = async () =>
  await Font.loadAsync({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
  });

  export default useFonts;