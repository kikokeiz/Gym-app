package com.frandu.gymapp.screens

import androidx.compose.material3.*
import androidx.compose.runtime.Composable

@Composable
fun RegisterScreen(onNavigateBack: () -> Unit) {
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Registro") })
        }
    ) {
        Button(onClick = onNavigateBack) {
            Text("Volver al login")
        }
    }
}