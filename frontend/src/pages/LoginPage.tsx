// Importamos hooks de React, navegación y servicios, además de componentes de Material UI
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Box, TextField, Button, Typography, Link } from '@mui/material';

const LoginPage = () => {
  // Estados para almacenar email, contraseña y posibles errores
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redirigir entre rutas

  // Maneja el envío del formulario de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita recarga de página

    try {
      // Intenta iniciar sesión usando el servicio authService
      const response = await authService.login(email, password);
      localStorage.setItem('token', response.token); // Guarda el token en localStorage
      navigate('/tracking'); // Redirige a la página de tracking tras login exitoso
    } catch (err) {
      setError('Credenciales incorrectas'); // Muestra mensaje de error
      console.error('Login error:', err);
    }
  };

  return (
    // Formulario centrado con estilos usando Material UI
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 10,
        p: 4,
        boxShadow: 3,
        borderRadius: 2
      }}
    >
      {/* Título de la página */}
      <Typography variant="h5" gutterBottom textAlign="center" color="black">
        Iniciar Sesión
      </Typography>

      {/* Mostrar error si existe */}
      {error && (
        <Typography color="error" textAlign="center" mb={2}>
          {error}
        </Typography>
      )}

      {/* Campo para email */}
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Campo para contraseña */}
      <TextField
        label="Contraseña"
        type="password"
        fullWidth
        margin="normal"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Botón para enviar el formulario */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Ingresar
      </Button>

      {/* Link para ir a la página de registro */}
      <Typography textAlign="center" display="flex" justifyContent="center" alignItems="center">
        ¿No tienes cuenta?
        <Link href="/register" underline="hover" sx={{ ml: 1 }}>
          Regístrate
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginPage;
