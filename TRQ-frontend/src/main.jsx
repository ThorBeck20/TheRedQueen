import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Bonds from './components/BondsPage/Bonds.jsx';
import Stocks from './components/Stockspage/Stocks.jsx';
import Options from './components/OptionsPage/Options.jsx';
import { ThemeProvider } from './components/ThemeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/Bonds" element={<Bonds />} />
            <Route path="/Stocks" element={<Stocks />} />
            <Route path="/Options" element={<Options />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
