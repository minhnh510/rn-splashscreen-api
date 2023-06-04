package com.awesomeproject;

import android.os.Bundle;

import androidx.core.splashscreen.SplashScreen;

import com.awesomeproject.viewmodel.MainViewModel;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import javax.inject.Singleton;

import dagger.hilt.android.AndroidEntryPoint;

@AndroidEntryPoint
public class MainActivity extends ReactActivity {
    @Singleton
    private static MainActivity instance;

    @Singleton
    public MainViewModel mainViewModel;

    public static MainActivity getInstance() {
        return instance;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        mainViewModel = new MainViewModel();
        instance = this;

        SplashScreen splashScreen = SplashScreen.installSplashScreen(this);
        // Handle the splash screen transition.
        splashScreen.setKeepOnScreenCondition(() -> mainViewModel.get_isLoading().getValue());

        super.onCreate(savedInstanceState);

        // Set up an OnPreDrawListener to the root view native.
//        final View content = findViewById(android.R.id.content);
//        content.getViewTreeObserver().addOnPreDrawListener(
//                new ViewTreeObserver.OnPreDrawListener() {
//                    @Override
//                    public boolean onPreDraw() {
//                        // Check whether the initial data is ready.
//                        content.getViewTreeObserver().removeOnPreDrawListener(this);
//                        return true;
//                    }
//                });
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AwesomeProject";
    }

    /**
     * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
     * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
     * (aka React 18) with two boolean flags.
     */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new DefaultReactActivityDelegate(
                this,
                getMainComponentName(),
                // If you opted-in for the New Architecture, we enable the Fabric Renderer.
                DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
                // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
                DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
    }
}
