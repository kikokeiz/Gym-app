import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/Layout';
import WorkoutTrackingPage from './pages/TrackingPage';
import StorePage from './pages/StorePage'; // <--- asegúrate que existe
import SubscriptionsPage from './pages/SubscriptionsPage'; // <--- asegúrate que existe

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
