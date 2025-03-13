import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import Homepage from '../src/pages/Homepage/Homepage.tsx';
import ModesPage from '../src/pages/Modes/ModesPage.tsx';
import KeyByKey from '../src/pages/KeybyKey/KeybykeyPage.tsx';
import LayoutSelectionPage from './pages/LayoutSelection/LayoutSelectionPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/layouts" element={<LayoutSelectionPage />} />
        <Route path="/modes" element={<ModesPage />} />
        <Route path="/keybykey" element={<KeyByKey />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
