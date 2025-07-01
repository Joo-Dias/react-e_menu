import { redirect } from 'next/navigation'
import styles from './page.module.scss'
import logoImg from '/public/menu-logo.svg'
import { api } from '@/services/api'

import Link from 'next/link'

export default function Page() {

  async function handleLogin(formData: FormData) {
    "use server"

    const email = formData.get("email")
    const password = formData.get("password")

    if (email === "" || password === "") {
      return
    }

    try {

      const response = await api.post("/session", {
        email,
        password
      })

      if (!response.data.token) {
        return
      }

      console.log(response)

    } catch (err) {
      console.log(err)
      return
    }

    redirect("/dashboard")
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <h1 className={styles.title}>E-MENU</h1>

        <section className={styles.login}>
          <form action={handleLogin}>
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