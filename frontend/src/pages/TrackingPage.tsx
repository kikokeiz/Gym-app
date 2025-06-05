import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { TooltipProps } from 'recharts';

type WorkoutData = {
  day: string;
  minutes: number;
};

const API_URL = import.meta.env.VITE_API_URL;

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#3b82f6',
          padding: '16px 24px',
          borderRadius: 8,
          color: '#fff',
          fontSize: '1.2rem',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          minWidth: 180,
        }}
      >
        <p style={{ margin: 0 }}>{`Día: ${label}`}</p>
        <p style={{ margin: 0 }}>{`Tiempo: ${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

export default function WorkoutTrackingPage() {
  const [workoutData, setWorkoutData] = useState<WorkoutData[]>([]);
  const [day, setDay] = useState('');
  const [minutes, setMinutes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_URL}/workouts`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Error al obtener datos');
        const data = await res.json();
        setWorkoutData(data);
      } catch (err) {
        console.error('Error al obtener los datos:', err);
        setError('No se pudieron cargar los datos del servidor.');
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!day.trim()) {
      setError('El campo "Día" es obligatorio');
      return;
    }

    const minutesNum = Number(minutes);
    if (isNaN(minutesNum) || minutesNum < 0) {
      setError('Por favor ingresa un número válido para minutos');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/workouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ day, minutes: minutesNum }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Error al guardar datos');
      }

      const newEntry: WorkoutData = await response.json();
      setWorkoutData((prev) => [...prev, newEntry]);
      setDay('');
      setMinutes('');
      setSuccess('Datos guardados correctamente');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Error al guardar los datos. Intenta nuevamente.');
      } else {
        setError('Error desconocido al guardar los datos.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minWidth: 1100,
        bgcolor: '#f5f5f5',
        px: 2,
        py: 4,
        gap: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          minWidth: 800,
          p: 4,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          Recorrido
        </Typography>

        <Box sx={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workoutData}>
              <XAxis dataKey="day" />
              <YAxis
                label={{
                  value: 'Tiempo (min)',
                  angle: -90,
                  position: 'insideLeft',
                  dy: 60,
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="minutes" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 600,
          p: 4,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Añadir nuevo registro de entrenamiento
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Día"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="Ejemplo: Lun 5"
            required
          />
          <TextField
            label="Minutos"
            type="number"
            inputProps={{ min: 0 }}
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {success}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 3 }}
            fullWidth
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
