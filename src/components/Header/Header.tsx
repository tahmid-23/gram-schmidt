import styles from './Header.module.css';

export interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
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
