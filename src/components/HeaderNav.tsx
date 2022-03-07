import { FC } from 'react';
import Link from 'next/link';
import { MdConnectWithoutContact } from 'react-icons/md';
import styles from '../styles/Home.module.scss';


const HeaderNav: FC = () => {
  return (
    <section className={styles.HeaderNav}>
          <h1 className={styles.title}>
            Bem Vindo(a)!
            <span>
              <b>Obrigado pela <br />visita, <br />volte sempre!</b>
            </span>
          </h1>

          <span className={styles.loginBtn}>
            <MdConnectWithoutContact className="login-icon" />
            Conectar-se
          </span>
          <button type="button">
            <MdConnectWithoutContact className="login-icon" />
            Conectar-se
          </button>

          <nav className={styles.nav}>
            <Link href="/projects">
              <h3 className={styles.card}>Projetos</h3>
            </Link>

            <Link href="/skills">
              <h3 className={styles.card}>Habilidades</h3>
            </Link>

            <Link href="/networking">
              <h3 className={styles.card}>Networking</h3>
            </Link>

            <Link href="/testimonials">
              <h3 className={styles.card}>Depoimentos</h3>
            </Link>
          </nav>
        </section>);
}

export default HeaderNav;
