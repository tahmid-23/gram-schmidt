import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GramSchmidtApp from '../GramSchmidt/GramSchmidtApp/GramSchmidtApp';
import PageNotFound from '../PageNotFound/PageNotFound';
import Welcome from '../Welcome/Welcome';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/gram-schmidt" element={<GramSchmidtApp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
