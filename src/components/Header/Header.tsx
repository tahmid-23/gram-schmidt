import { FC } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <>
      <header>
        <h1 className={styles.title}>{title}</h1>
      </header>
      <hr className={styles.separator} />
    </>
  );
};

export default Header;
