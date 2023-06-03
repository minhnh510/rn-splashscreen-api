package com.awesomeproject;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ObjectAnimator;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.ViewTreeObserver;
import android.view.animation.AnticipateInterpolator;

import androidx.core.splashscreen.SplashScreen;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Handle the splash screen transition.
        SplashScreen splashScreen = SplashScreen.installSplashScreen(this);

        super.onCreate(savedInstanceState);

        // Set up an OnPreDrawListener to the root view.
        // For native
        final View content = findViewById(android.R.id.content);
        content.getViewTreeObserver().addOnPreDrawListener(
                new ViewTreeObserver.OnPreDrawListener() {
                    @Override
                    public boolean onPreDraw() {
                        // Check whether the initial data is ready.
                        content.getViewTreeObserver().removeOnPreDrawListener(this);
                        return true;
                    }
                });

//         Add a callback that's called when the splash screen is animating to the
//         app content.
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
//            getSplashScreen().setOnExitAnimationListener(splashScreenView -> {
//                final ObjectAnimator slideUp = ObjectAnimator.ofFloat(
//                        splashScreenView,
//                        View.TRANSLATION_Y,
//                        0f,
//                        -splashScreenView.getHeight()
//                );
//                slideUp.setInterpolator(new AnticipateInterpolator());
//                slideUp.setDuration(200L);
//
//                // Call SplashScreenView.remove at the end of your custom animation.
//                slideUp.addListener(new AnimatorListenerAdapter() {
//                    @Override
//                    public void onAnimationEnd(Animator animation) {
//                        splashScreenView.remove();
//                    }
//                });
//
//                // Run your animation.
//                slideUp.start();
//            });
//        }
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
