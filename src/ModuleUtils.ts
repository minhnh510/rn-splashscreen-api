import {Alert, Platform, ToastAndroid, NativeModules} from 'react-native';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
/**
 * Legacy Native Modules
 */
const {SplashModule} = NativeModules;

/**
 * Turbo Native Modules are the next iteration on Native Modules that provide a few extra benefits:
 * Strongly typed interfaces that are consistent across platforms
 * The ability to write your code in C++, either exclusively or integrated with another native platform language, reducing the need to duplicate implementations across platforms
 * Lazy loading of modules, allowing for faster app startup
 * The use of JSI, a JavaScript interface for native code, allows for more efficient communication between native and JavaScript code than the bridge
 */
import RTNMaxModule from 'rtn-max-module/js/NativeMaxModule';

export const hideSplash = () => {
  SplashModule.hideSplash();
};

export const callApi = () => {
  RTNMaxModule?.callApi()?.then(result => {
    Alert.alert('JSI: ' + result);
  });
};

const showToast = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert(message);
  }
};

export const callApiSync = () => {
  const startTime = Date.now();
  const params = {
    a: 1,
    b: 2,
  };

  console.info('[JSI]: callbackId: ' + nanoid());

  RTNMaxModule.callApi().then(data => {
    console.info(
      '[JSI]: response: ' + data + ' - time: ' + (Date.now() - startTime),
    );
    // showToast('[JSI]' + data + ' time:' + (Date.now() - startTime));
  });
};

export const callApiAsync = () => {
  const startTime = Date.now();
  const params = {
    a: 1,
    b: 2,
  };
  const id = RTNMaxModule?.callApiAsync(JSON.stringify(params), data => {
    console.info(
      '[JSI]: response: ' + data + ' - time: ' + (Date.now() - startTime),
    );
    showToast(
      '[JSI]' + data.substring(0, 32) + ' time:' + (Date.now() - startTime),
    );
  });
  console.info('[JSI]: async callbackId: ' + id);
};
