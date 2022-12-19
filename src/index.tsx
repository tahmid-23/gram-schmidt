import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GramSchmidt from './components/GramSchmidt/GramSchmidt';
import Home from './components/Home/Home';
import PageNotFound from './components/PageNotFound/PageNotFound';
import TimesTable from './components/TimesTable/TimesTable';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gram-schmidt" element={<GramSchmidt />} />
        <Route path="/times-table" element={<TimesTable />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
