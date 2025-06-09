// Importación de rutas y páginas principales
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/Layout';
import WorkoutTrackingPage from './pages/TrackingPage';
import StorePage from './pages/StorePage';
import SubscriptionsPage from './pages/SubscriptionsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Envolvemos las rutas con un layout común */}
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tracking" element={<WorkoutTrackingPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
