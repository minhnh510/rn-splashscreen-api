import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue';

export const spyOnMessageQueue = () => {
  // Spy debugging
  if (__DEV__) {
    const logSpy = info => {
      if (info.module === "RCTDeviceEventEmitter") return;
      if (info.module === "NativeAnimatedModule") return;
      
      const fromTo = info.type === 0 ? 'TO JS: ' : 'TO ANDROID: ';
      const methodSignature =
        info.module + '.' + info.method + '(' + JSON.stringify(info.args) + ')';
      console.log('[MessageQueue] spy: ', fromTo + methodSignature);
    };
    MessageQueue.spy(logSpy);
  }
};

