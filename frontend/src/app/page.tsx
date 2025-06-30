import styles from './page.module.scss'
import logoImg from '/public/menu-logo.svg'

import Link from 'next/link'


export default function Page() {
  return (
    <>
      <div className={styles.containerCenter}>
        <h1 className={styles.title}>E-MENU</h1>

        <section className={styles.login}>
          <form action="">
            <input
              type="email"
              required
              name='email'
              placeholder='Digite seu email...'
              className={styles.input}
            />

            <input
              type="password"
              required
              name='password'
              placeholder='**********'
              className={styles.input}
            />

            <button type='submit' className={styles.button}>
              Acessar
            </button>
          </form>

          <Link href='/signup' className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>
        </section>
      </div>
    </>
  )
}