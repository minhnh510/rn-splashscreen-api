package com.awesomeproject.viewmodel

import androidx.lifecycle.ViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject

@HiltViewModel
class MainViewModel @Inject constructor(

) : ViewModel() {
    private val _loading = MutableStateFlow(true)
    val _isLoading = _loading.asStateFlow()

    init {
//        viewModelScope.launch {
//            delay(1000)
//            _loading.value = false
//        }
    }

    fun setLoaded() {
        _loading.value = false
    }
}