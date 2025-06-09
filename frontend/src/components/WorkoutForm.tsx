import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

type Day = 'Lun' | 'Mar' | 'Mié' | 'Jue' | 'Vie' | 'Sáb' | 'Dom';

const initialData: Record<Day, number> = {
  Lun: 0,
  Mar: 0,
  Mié: 0,
  Jue: 0,
  Vie: 0,
  Sáb: 0,
  Dom: 0,
};

export default function WorkoutForm({ onSubmit }: { onSubmit: (data: Record<Day, number>) => void }) {
  const [form, setForm] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as Day;
    const value = Number(e.target.value);
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
      {Object.keys(form).map((day) => (
        <TextField
          key={day}
          label={day}
          name={day}
          type="number"
          value={form[day as Day]}
          onChange={handleChange}
          inputProps={{ min: 0 }}
        />
      ))}
      <Button type="submit" variant="contained">
        Guardar datos
      </Button>
    </Box>
  );
}
