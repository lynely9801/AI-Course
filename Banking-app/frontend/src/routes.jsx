import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './modules/Dashboard/Dashboard';
import DemoFeatures from './modules/DemoFeatures/DemoFeatures';
import Notification from './modules/Notification/Notification';
import Admin from './modules/Admin/Admin';
import LandingPage from './modules/LandingPage/LandingPage';
import WelcomeLogin from './modules/WelcomeLogin/WelcomeLogin';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<WelcomeLogin />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/features" element={<DemoFeatures />} />
    <Route path="/notification" element={<Notification />} />
    <Route path="/admin" element={<Admin />} />
  </Routes>
);

export default AppRoutes;
