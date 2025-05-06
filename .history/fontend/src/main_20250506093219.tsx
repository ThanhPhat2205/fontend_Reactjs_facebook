import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ⬅️ Thêm dòng này
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* ⬅️ Bọc App trong BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);