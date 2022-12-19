import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GramSchmidt from '../GramSchmidt/GramSchmidt';
import PageNotFound from '../PageNotFound/PageNotFound';
import TimesTable from '../TimesTable/TimesTable';
import Welcome from '../Welcome/Welcome';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/gram-schmidt" element={<GramSchmidt />} />
        <Route path="/times-table" element={<TimesTable />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
