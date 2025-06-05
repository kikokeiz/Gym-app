import { useState } from 'react';
import {
  Box,
  Container,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const navItems = [
  { text: 'Workout', path: '/tracking' },
  { text: 'Store', path: '/store' },
  { text: 'Subscriptions', path: '/subscriptions' },
];

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        GYM APP
      </Typography>
      <List>
        {navItems.map(({ text, path }) => (
          <ListItemButton
            key={text}
            selected={location.pathname === path}
            onClick={() => navigate(path)}
            sx={{ justifyContent: 'center' }}
          >
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', maxHeight: '300vh', bgcolor: '#f5f5f5' }}>
      {/* AppBar para móvil con botón menú */}
      <AppBar position="fixed" sx={{ display: { md: 'none' }, bgcolor: '#1976d2' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            GYM FDU
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="navegación principal"
      >
        {/* Drawer para móvil */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // mejor rendimiento en móvil
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Drawer permanente para desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f5f5",
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start', // Aquí el cambio para que no se centre verticalmente
          minHeight: '1100vh',
          minWidth: 1100,
        }}
      >
<Container
  maxWidth={false} // Desactiva el maxWidth predefinido
  sx={{ width: '1200px', bgcolor: 'white',color: "black", p: 4, borderRadius: 2, boxShadow: 3 }}
>
  <Toolbar sx={{ display: { md: 'none' } }} />
  <Outlet />
</Container>
      </Box>
    </Box>
  );
};

export default Layout;
