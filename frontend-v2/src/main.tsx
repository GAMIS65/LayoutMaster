import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import Homepage from '../src/pages/Homepage/Homepage.tsx';
import Modes from '../src/pages/Modes/Modes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/modes" element={<Modes />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
