package com.frandu.gymapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.*
import com.frandu.gymapp.ui.theme.GymAppTheme
import androidx.navigation.compose.rememberNavController
import com.frandu.gymapp.navigation.GymNavGraph

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            GymAppTheme {
                val navController = rememberNavController()
                GymNavGraph(navController)
            }
        }
    }
}
