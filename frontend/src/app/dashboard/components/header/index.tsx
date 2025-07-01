import Link from 'next/link'
import styles from './styles.module.scss'
import { LogOutIcon } from 'lucide-react'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <h1 className={styles.title}>E-MENU</h1>
                </Link>

                <nav>
                    <Link href='/dashboard/category'>
                        Categoria
                    </Link>

                    <Link href='/dashboard/product'>
                        Produto
                    </Link>

                    <form>
                        <button type='submit'>
                            <LogOutIcon size={24} color='#FFF' />
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}