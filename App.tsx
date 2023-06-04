/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  Button,
  InteractionManager,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MarqueeView from 'react-native-marquee-view';
import PerformanceStats from 'react-native-performance-stats';

import {callApiAsync, callApiSync, hideSplash} from './src/ModuleUtils';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const [stats, setStats] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    hideSplash();
  }, []);

  useEffect(() => {
    const listener = PerformanceStats.addListener(stats => {
      setStats(
        `jsFPS: ${stats.jsFps.toFixed(2)} - uiFPS: ${stats.uiFps.toFixed(
          2,
        )} - dropped: ${stats.framesDropped}`,
      );
    });

    PerformanceStats.start();

    return () => {
      PerformanceStats.stop();
      listener.remove();
    };
  }, []);

  // !: https://reactnative.dev/docs/0.62/performance#moving-a-view-on-the-screen-scrolling-translating-rotating-drops-ui-thread-fps

  const spamCallApiAsync = () => {
    // !: https://reactnative.dev/docs/0.62/performance#my-touchablex-view-isnt-very-responsive
    requestAnimationFrame(() => {
      for (let i = 0; i < 10; i++) {
        callApiAsync();
      }
    });
  };

  const spamCallApiSync = () => {
    requestAnimationFrame(() => {
      for (let i = 0; i < 10000; i++) {
        callApiSync();
      }
    });
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        alwaysBounceVertical
        contentInsetAdjustmentBehavior="automatic"
        renderToHardwareTextureAndroid
        shouldRasterizeIOS
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Test">
            <View style={{height: 50, width: '100%'}}>
              <Text style={{fontSize: 12}}>{stats}</Text>
            </View>
            <ActivityIndicator size="large" style={{width: '100%'}} />
            <MarqueeView
              autoPlay={true}
              speed={0.15}
              style={{
                backgroundColor: 'gray',
                width: '100%',
                height: 30,
              }}>
              <Text style={{fontSize: 18}}>
                This is demo content - This is demo content - This is demo
                content. Read the docs to discover what to do next
              </Text>
            </MarqueeView>
          </Section>
          <Section title="Demo">
            <Button title="Call TurboModule" onPress={callApiAsync} />
            <Button
              title="Spam call async TurboModule"
              onPress={spamCallApiAsync}
            />
            <Button
              title="Spam call sync TurboModule"
              onPress={spamCallApiSync}
            />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
