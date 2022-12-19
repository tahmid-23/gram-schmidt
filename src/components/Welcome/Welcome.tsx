import { useTitle } from '../../hooks/useTitle';

const Welcome = () => {
  useTitle('Math Tools');

  return <p>Welcome!</p>;
};

export default Welcome;
