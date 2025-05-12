package com.frandu.gymapp.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.compose.rememberNavController

@Composable
fun RegisterScreen(navController: NavHostController) {
    // UI de registro
    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
                text = "Pantalla de Registro",
                style = MaterialTheme.typography.headlineMedium
            )
            Spacer(modifier = Modifier.height(16.dp))
            Button(onClick = {
                // Navega de regreso al login
                navController.navigate("login")
            }) {
                Text("Ir al Login")
            }
        }
    }}
@Preview(showBackground = true)
@Composable
fun RegisterScreenPreview() {
    // Necesitarás un tema Material para la vista previa
    MaterialTheme {
        RegisterScreen(rememberNavController())
    }
}