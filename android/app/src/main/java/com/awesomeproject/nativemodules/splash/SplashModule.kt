package com.awesomeproject.nativemodules.splash

import com.awesomeproject.MainActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SplashModule(
    private val context: ReactApplicationContext
) : ReactContextBaseJavaModule() {
    companion object {
        const val REACT_NAME = "SplashModule"
    }

    override fun getName(): String = REACT_NAME

    private var isTriggedHideSplash = false

    @ReactMethod
    fun showSplash() {
    }

    @ReactMethod
    fun hideSplash() {
        if (isTriggedHideSplash) return

        MainActivity.getInstance().mainViewModel.setLoaded()
        isTriggedHideSplash = true
    }
}