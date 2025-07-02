import styles from './styles.module.scss'
import { Button } from '../components/button'

export default function Category() {
    async function handleRegisterCategory() {
        'use server'
    }

    return (
        <main className={styles.container}>
            <h1>Nova Categoria</h1>

            <form action={handleRegisterCategory} className={styles.form}>
                <input
                    type="text"
                    name='name'
                    placeholder='Nome da categoria, ex: Pizzas'
                    required
                    className={styles.input}
                />

                <Button name='Cadastrar' />
            </form>
        </main>
    )
}