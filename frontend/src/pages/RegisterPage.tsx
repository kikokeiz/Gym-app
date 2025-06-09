import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress
} from '@mui/material';

// Tipos para los datos del formulario
type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  // Estado para los datos del formulario y otros estados para controlar la UI
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Actualiza el estado cuando el usuario escribe en un campo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Valida los datos del formulario antes de enviar
  const validateForm = (): boolean => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Todos los campos son obligatorios');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Ingresa un email válido');
      return false;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    return true;
  };

  // Maneja el envío del formulario para registrar al usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return; // Si hay errores, no continuar

    setLoading(true);

    try {
      // Llama al servicio para registrar al usuario
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      setSuccess(true); // Muestra mensaje de éxito
      setTimeout(() => navigate('/login'), 2000); // Redirige después de 2 segundos
    } catch (err) {
      // Captura y muestra errores del servidor o de red
      const errorMessage =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (err as Error).message ||
        'Error al registrar. Intenta nuevamente.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Formulario con estilos de Material UI
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        minWidth: 600,
        mx: 'auto',
        mt: 10,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper'
      }}
      noValidate
    >
      <Typography variant="h5" gutterBottom textAlign="center" color="primary">
        Crear Cuenta
      </Typography>

      {/* Mostrar error si existe */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Mostrar mensaje de éxito */}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          ¡Registro exitoso! Redirigiendo...
        </Alert>
      )}

      {/* Campos del formulario */}
      <TextField
        label="Nombre completo"
        name="name"
        fullWidth
        margin="normal"
        required
        value={formData.name}
        onChange={handleChange}
        autoFocus
      />

      <TextField
        label="Email"
        type="email"
        name="email"
        fullWidth
        margin="normal"
        required
        value={formData.email}
        onChange={handleChange}
        inputProps={{ pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" }}
      />

      <TextField
        label="Contraseña"
        type="password"
        name="password"
        fullWidth
        margin="normal"
        required
        value={formData.password}
        onChange={handleChange}
        inputProps={{ minLength: 6 }}
      />

      <TextField
        label="Confirmar Contraseña"
        type="password"
        name="confirmPassword"
        fullWidth
        margin="normal"
        required
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      {/* Botón para enviar, muestra spinner si está cargando */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, height: 48 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Registrarse'}
      </Button>

      {/* Link para ir a login */}
      <Typography textAlign="center">
        ¿Ya tienes cuenta?{' '}
        <Link
          href="/login"
          underline="hover"
          onClick={(e) => {
            e.preventDefault();
            navigate('/login');
          }}
        >
          Inicia Sesión
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterPage;
