import { Link } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
import Header from '../Header/Header';
import styles from './Home.module.css';

const Home = () => {
  useTitle('Math Tools');

  return (
    <>
      <Header title="Home" />
      <nav className={styles.widgetNav}>
        <p>Widgets:</p>
        <ul>
          <li>
            <Link to="/gram-schmidt">Gram-Schmidt Calculator</Link>
          </li>
          <li>
            <Link to="/times-table">Times Table</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Home;
