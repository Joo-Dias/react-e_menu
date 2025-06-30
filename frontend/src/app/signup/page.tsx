import Link from "next/link"
import styles from '../page.module.scss'

export default function Signup() {
    return (
        <>
            <div className={styles.containerCenter}>
                <h1 className={styles.title}>E-MENU</h1>

                <section className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form action="">
                        <input
                            type="name"
                            required
                            name='name'
                            placeholder='Digite seu nome...'
                            className={styles.input}
                        />

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
                            Cadastrar
                        </button>
                    </form>

                    <Link href='/' className={styles.text}>
                        Já possui uma conta? Faça login!
                    </Link>
                </section>
            </div>
        </>
    )
}