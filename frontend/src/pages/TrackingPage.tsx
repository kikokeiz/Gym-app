import { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { progressService } from '../services/progressService'; // Ajusta path

type ProgressData = {
  _id: string;
  date: string;
  weight: number;
  reps: number;
  exercise: string;
};

export default function WorkoutTrackingPage() {
  const [progress, setProgress] = useState<ProgressData[]>([]);
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Cargar progreso al montar
    const fetchProgress = async () => {
      try {
        const data = await progressService.getProgress();
        setProgress(data);
      } catch (error) {
        console.error('Error cargando progreso', error);
      }
    };
    fetchProgress();
  }, []);

  const handleAddProgress = async () => {
    if (!exercise || !weight || !reps) return alert('Completa todos los campos');
    setLoading(true);
    try {
      const newEntry = await progressService.addProgress({
        exercise,
        weight: Number(weight),
        reps: Number(reps),
        date: new Date().toISOString()
      });
      setProgress(prev => [newEntry, ...prev]);
      setExercise('');
      setWeight('');
      setReps('');
    } catch (error) {
      console.error('Error guardando progreso:', error);
      alert('Error guardando progreso');
    }
     finally {
      setLoading(false);
    }
  };

  // Transformar datos para gráfica
  // Aquí usaremos reps por día como ejemplo
  const chartData = progress.map(entry => {
    const dateObj = new Date(entry.date);
    return {
      day: dateObj.toLocaleDateString('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      }),
      reps: entry.reps
    };
  });
  

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', minHeight: '100vh', bgcolor: '#f5f5f5', px: 2, pt: 4 }}>
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 600, p: 4, borderRadius: 2, backgroundColor: '#fff' }}>
        <Typography variant="h5" gutterBottom textAlign="center">Registro de Progreso</Typography>

        <Box component="form" sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }} noValidate autoComplete="off">
          <TextField label="Ejercicio" value={exercise} onChange={e => setExercise(e.target.value)} required />
          <TextField label="Peso" value={weight} onChange={e => setWeight(e.target.value)} type="number" required />
          <TextField label="Repeticiones" value={reps} onChange={e => setReps(e.target.value)} type="number" required />
          <Button variant="contained" onClick={handleAddProgress} disabled={loading}>
            {loading ? 'Guardando...' : 'Agregar'}
          </Button>
        </Box>

        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reps" fill="#3b82f6">
                <LabelList dataKey="reps" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  );
}
