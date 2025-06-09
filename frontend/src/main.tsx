// Importamos StrictMode para ayudar a detectar problemas en la app
import { StrictMode } from 'react'
// createRoot es el método moderno para renderizar la app en React 18+
import { createRoot } from 'react-dom/client'
// Importamos estilos globales
import './index.css'
// Importamos el componente principal de la aplicación
import App from './App.tsx'

// Seleccionamos el elemento root y renderizamos el componente App dentro de StrictMode
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
