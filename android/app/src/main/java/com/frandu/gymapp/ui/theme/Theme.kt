package com.frandu.gymapp.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable

@Composable
fun GymAppTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LightColorScheme, // Usa tu esquema de colores
        typography = Typography,       // Usa tu tipografía
        content = content
    )
}