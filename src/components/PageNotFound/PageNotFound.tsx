import { useTitle } from '../../hooks/useTitle';

const PageNotFound = () => {
  useTitle('Math Tools - 404');

  return <p>Unknown page.</p>;
};

export default PageNotFound;
