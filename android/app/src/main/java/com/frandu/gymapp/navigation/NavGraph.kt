package com.frandu.gymapp.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.frandu.gymapp.screens.LoginScreen
import com.frandu.gymapp.screens.RegisterScreen

@Composable
fun GymNavGraph(navController: NavHostController) {
    NavHost(navController, startDestination = "login") {
        composable("login") {
            LoginScreen(navController) {
                navController.navigate(Routes.REGISTER)
            }
        }
        composable("register") {
            RegisterScreen(navController) {
                navController.popBackStack()
            }
        }
    }
}
