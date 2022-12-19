import { useTitle } from '../../hooks/useTitle';
import QuickNavigation from '../QuickNavigation/QuickNavigation';

const PageNotFound = () => {
  useTitle('Math Tools - 404');

  return (
    <>
      <p>Unknown page.</p>
      <QuickNavigation />
    </>
  );
};

export default PageNotFound;
