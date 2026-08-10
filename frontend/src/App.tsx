import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

import { MainLayout } from './layouts/MainLayout';

import { Landing } from './pages/Landing';
import { About } from './pages/About';
import { Schedule } from './pages/Schedule';
import { TechEvents } from './pages/TechEvents';
import { NonTechEvents } from './pages/NonTechEvents';
import { Register } from './pages/Register';
import { Rules } from './pages/Rules';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { SuccessPage } from './pages/SuccessPage';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/events/technical" element={<TechEvents />} />
              <Route path="/events/non-technical" element={<NonTechEvents />} />
              <Route path="/register" element={<Register />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/registration-success" element={<SuccessPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
